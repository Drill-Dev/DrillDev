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

export default async function drillSubmitRoute(app: FastifyInstance) {
	app.post('/run', async (request, reply) => {
		const submissionId = Math.random() * 1000;

		// Create a temporary directory for the submission
		return await tmp.withDir(
			async ({ path: submissionPath }) => {
				let submissionNetwork;
				let submissionContainer;
				let judgeContainer;

				try {
					// Retrieve the uploaded file from the request
					const fileData = await request.file();

					// Save the file to the submission directory
					await pump(
						fileData.file,
						fs.createWriteStream(path.join(submissionPath, 'index.html'))
					);

					// Create the submission network
					submissionNetwork = await docker.createNetwork({
						Name: `submission-${submissionId}`,
					});

					// Create the python container to run the submission on
					submissionContainer = await docker.createContainer({
						Image: 'python:3.8',
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
					await submissionContainer.start();

					// Connect the submission container to the submission network
					await submissionNetwork.connect({
						Container: submissionContainer.id,
					});

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
						return await reply.send({ status: 'PE' });
					}

					// Create the Playwright container to run the test on
					judgeContainer = await docker.createContainer({
						Image: 'apify/actor-node-playwright-chrome:14',
						Cmd: stringArgv('node /home/myuser/test/test.js'),
						Env: [
							// "NODE_PATH=/home/myuser/node_modules",
						],
						HostConfig: {
							// Mount the test directory to /root/test
							Binds: [`${__dirname}/../../../test:/home/myuser/test:ro`],
						},
						Tty: true,
					});
					await judgeContainer.start();

					// Connect the judge container to the submission network
					await submissionNetwork.connect({
						Container: judgeContainer.id,
					});

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
						return Buffer.concat(output).toString("utf-8");
					})();

					const exitCode = (await judgeContainer.inspect()).State.ExitCode;
					if (exitCode) {
						console.log(logs);
						throw new Error(`nonzero exit code ${exitCode}`);
					}
					const { status } = JSON.parse(logs);
					await reply.send({ status });
				}

				catch (error) {
					console.log(error);
					await reply.send({ status: "IE" });
				}

				finally {
					if (judgeContainer) {
						// Destroy the judge container
						await judgeContainer.remove({ force: true });
					}
					if (submissionContainer) {
						// Destroy the submission container
						await submissionContainer.remove({ force: true });
					}
					if (submissionNetwork) {
						// Destroy the submission network
						await submissionNetwork.remove({ force: true });
					}
				}
			},
			{ unsafeCleanup: true }
		);
	});
}
