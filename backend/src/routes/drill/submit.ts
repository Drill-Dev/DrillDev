import Docker from 'dockerode';
import { FastifyInstance } from 'fastify';
import fs from 'fs-extra';
import path from 'path';
import { pipeline } from 'stream';
import stringArgv from 'string-argv';
import tmp from 'tmp-promise';
import { promisify } from 'util';

// A promisfied wrapper for easily piping a file read stream into a write stream
const pump = promisify(pipeline);

const docker = new Docker();

type SubmissionResult = {
	status: string;
};

async function judgeSubmission({
	submissionNetwork,
	submissionId,
}: {
	submissionNetwork: Docker.Network;
	submissionId: string;
}): Promise<SubmissionResult> {
	// Create the Playwright container to run the test on
	const judgeContainer = await docker.createContainer({
		Image: 'drilldev-js-playwright:latest',
		Cmd: stringArgv('node /root/test/test.js'),
		Env: [`HOST=submission_${submissionId}`],
		HostConfig: {
			// We're mounting to /home/myuser because it's what the container allows
			Binds: [`${__dirname}/../../../test:/root/test:ro`],
		},
		Tty: true,
	});

	// Connect the judge container to the submission network
	await submissionNetwork.connect({
		Container: judgeContainer.id,
	});

	try {
		await judgeContainer.start();

		const logStream = await judgeContainer.logs({
			stdout: true,
			stderr: true,
			follow: true,
		});

		const logs = await (async () => {
			const output = [];
			for await (const data of logStream as AsyncIterable<Buffer>) {
				output.push(data);
			}
			return Buffer.concat(output).toString('utf-8');
		})();

		const exitCode = (await judgeContainer.inspect()).State.ExitCode;

		// If the test passed
		if (exitCode === 0) {
			return { status: 'AC' };
		} else {
			console.error(logs);
			return { status: 'WA' };
		}
	} finally {
		// Destroy the test container
		await judgeContainer.remove({ force: true });
	}
}

export default async function drillSubmitRoute(app: FastifyInstance) {
	app.post('/run', async (request, reply) => {
		const submissionId = Math.floor(Math.random() * 1000).toString();

		// Create a temporary directory for the submission
		return await tmp.withDir(
			async ({ path: submissionPath }) => {
				// Retrieve the uploaded file from the request
				const fileData = await request.file();

				// Save the file to the submission directory
				await pump(
					fileData.file,
					fs.createWriteStream(path.join(submissionPath, 'index.html'))
				);

				// Create the python container to run the submission on
				await docker.getImage('python:3.8');

				const submissionNetwork = await docker.createNetwork({
					Name: `submission-network-${submissionId}`,
				});

				const submissionContainer = await docker.createContainer({
					Image: 'python:3.8',
					name: `submission_${submissionId}`,
					Cmd: stringArgv('python -m http.server -d /root/html 8080'),
					ExposedPorts: { '8080/tcp': {} },
					HostConfig: {
						// Mount the submission directory to /root/html
						Binds: [`${submissionPath}:/root/html:ro`],
					},
				});

				try {
					// Connect the submission container to the submission network
					await submissionNetwork.connect({
						Container: submissionContainer.id,
					});

					await submissionContainer.start();

					const ports = ['8080'];

					const createBashPortCheckString = (port: string) => {
						return `"$(curl -o /dev/null -w '%{http_code}' submission_${submissionId}:${port})" != '200'`;
					};

					const checkPortsCondition = ports
						.map((port) => createBashPortCheckString(port))
						.join(' || ');

					const portCheckContainer = await docker.createContainer({
						Image: 'drilldev-port-check',
						Cmd: [
							'timeout',
							'5',
							'bash',
							'-c',
							`while [[ ${checkPortsCondition} ]]; do sleep 1; done`,
						],
					});

					await submissionNetwork.connect({
						Container: portCheckContainer.id,
					});
					await portCheckContainer.start();
					await portCheckContainer.wait({
						condition: 'not-running',
					});

					const exitCode = (await portCheckContainer.inspect()).State.ExitCode;

					if (exitCode !== 0) {
						// Send a PE if they're taking too long to bind to the port
						return reply.send({ status: 'PE' });
					}

					const result = await judgeSubmission({
						submissionNetwork,
						submissionId,
					});

					return reply.send(result);
				} catch (error) {
					console.log(error);
					return { status: 'IE' };
				} finally {
					// Destroy the submission container
					await submissionContainer.remove({ force: true });
					await submissionNetwork.remove({ force: true });
				}
			},
			{ unsafeCleanup: true }
		);
	});
}
