import Docker from 'dockerode';
import { FastifyInstance } from 'fastify';
import fs from 'fs-extra';
import got from 'got';
import path from 'path';
import playwright from 'playwright';
import promiseRetry from 'promise-retry';
import { pipeline } from 'stream';
import stringArgv from 'string-argv';
import { dir } from 'tmp-promise';
import util from 'util';

// A promisfied wrapper for easily piping a file read stream into a write stream
const pump = util.promisify(pipeline);

const docker = new Docker();

// A function for running the Playwright test
async function runTest(browser: playwright.Browser) {
	const page = await browser.newPage();

	await page.goto('http://localhost:8080');
	await page.setDefaultTimeout(3000);
	await page.click("text='Login'");
}

export default async function drillSubmitRoute(app: FastifyInstance) {
	app.post('/run', async (request, reply) => {
		// Create a temporary directory
		const { path: dirPath } = await dir();

		// Retrieve the uploaded file from the request
		const data = await request.file();

		// Save the file to the temporary directory
		await pump(
			data.file,
			fs.createWriteStream(path.join(dirPath, 'index.html'))
		);

		// Create the python container to run the submission on
		await docker.getImage('python:3.8');
		const submissionContainer = await docker.createContainer({
			Image: 'python:3.8',
			Cmd: stringArgv('python -m http.server -d /root/html 80'),
			ExposedPorts: { '80/tcp': {} },
			HostConfig: {
				// Mount the temporary directory to /root/html
				Binds: [`${dirPath}:/root/html:ro`],
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
			} catch (e) {
				// Send a TLE if they're taking too long to bind to the port
				return await reply.send({
					status: 'PE',
				});
			}

			// Launch a playwright browser
			const browser = await playwright.chromium.launch();
			try {
				// Run the test
				await runTest(browser);

				// Send an AC status if the test passes without errors
				return reply.send({ status: 'AC' });
			} catch (e) {
				console.error(e);

				// Send a TLE if the error is a TimeoutError
				if (e instanceof playwright.errors.TimeoutError) {
					return reply.send({
						status: 'TLE',
					});
				}

				// Otherwise, send an IE (internal error)
				else {
					return reply.send({
						status: 'IE',
					});
				}
			} finally {
				// Close the browser
				await browser.close();
			}
		} finally {
			// Destroy the submission container
			await submissionContainer.remove({
				force: true,
			});

			// Clean up the temporary directory
			await fs.remove(dirPath);
		}
	});
}
