import Docker from 'dockerode';
import { FastifyInstance } from 'fastify';
import fs from 'fs-extra';
import got from 'got';
import path from 'path';
import promiseRetry from 'promise-retry';
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
		Image: 'apify/actor-node-playwright-chrome:14',
		Cmd: stringArgv('node /home/myuser/test/test.js'),
		Env: [`HOST=submission_${submissionId}`],
		HostConfig: {
			// Mount the test directory to /root/test
			Binds: [`${__dirname}/../../../test:/home/myuser/test:ro`],
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
			console.log(logs);
			throw new Error(`nonzero exit code ${exitCode}`);
		}
	} catch (error) {
		console.error(error);
		return { status: 'IE' };
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
					Cmd: stringArgv('python -m http.server -d /root/html 80'),
					ExposedPorts: { '80/tcp': {} },
					HostConfig: {
						// Mount the submission directory to /root/html
						Binds: [`${submissionPath}:/root/html:ro`],
						PortBindings: {
							'80/tcp': [
								{
									HostPort: '8080',
								},
							],
						},
					},
				});

				// Connect the submission container to the submission network
				await submissionNetwork.connect({
					Container: submissionContainer.id,
				});

				await submissionContainer.start();

				try {
					try {
						// Give the page 5 seconds to bind to port 8080
						await promiseRetry(
							async (retry) => {
								const { statusCode } = await got.get('http://localhost:8080');
								if (!(statusCode >= 200 && statusCode < 400)) {
									retry(new Error('Could not bind to port.'));
								}
							},
							{ minTimeout: 1000, factor: 1, retries: 5 }
						);
					} catch {
						// Send a PE if they're taking too long to bind to the port
						return reply.send({ status: 'PE' });
					}

					const result = await judgeSubmission({
						submissionNetwork,
						submissionId,
					});
					return reply.send(result);
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
