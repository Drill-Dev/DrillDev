import Docker from 'dockerode';
import { FastifyInstance } from 'fastify';
import fs from 'fs-extra';
import got from 'got';
import path from 'path';
import playwright from 'playwright';
import promiseRetry from 'promise-retry';
import { pipeline } from 'stream';
import stringArgv from 'string-argv';
import tmp from 'tmp-promise';
import { promisify } from 'util';

// A promisfied wrapper for easily piping a file read stream into a write stream
const pump = promisify(pipeline);

const docker = new Docker();

// A function for running the Playwright test
async function runTest(browser: playwright.Browser) {
	const page = await browser.newPage();

	await page.goto('http://localhost:8080');
	await page.setDefaultTimeout(3000);
	await page.click("text='Login'");
}

type SubmissionStatus = {
	status: string;
};

async function judgeSubmission(): Promise<SubmissionStatus> {
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
		return { status: 'PE' };
	}

	// Launch a playwright browser
	const browser = await playwright.chromium.launch();
	try {
		// Run the test
		await runTest(browser);

		// Send an AC status if the test passes without errors
		return { status: 'AC' };
	} catch (error) {
		console.error(error);

		// Send a TLE if the error is a TimeoutError
		if (error instanceof playwright.errors.TimeoutError) {
			return { status: 'TLE' };
		} else {
			return { status: 'IE' };
		}
	} finally {
		// Close the browser
		await browser.close();
	}
}

export default async function drillSubmitRoute(app: FastifyInstance) {
	app.post('/run', async (request, reply) => {
		// Create a temporary directory for the submission
		return await tmp.withDir(
			async ({ path: submissionPath }) => {
				// Retrieve the uploaded file from the request
				const data = await request.file();

				// Save the file to the submission directory
				await pump(
					data.file,
					fs.createWriteStream(path.join(submissionPath, 'index.html'))
				);

				// Create the python container to run the submission on
				await docker.getImage('python:3.8');
				const submissionContainer = await docker.createContainer({
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

				// Create the Playwright container to run the test on
				const testContainer = await docker.createContainer({
					Image: 'mcr.microsoft.com/playwright:v1.14.0-focal',
					Cmd: stringArgv('python /root/test/test.py'),
					HostConfig: {
						// Mount the test directory to /root/test
						Binds: [`../../../../test:/root/test:ro`],
					},
				});
				await testContainer.start();

				try {
					const testStream = await testContainer.attach({});
					const testChunks = [];
					for await (let chunk of testStream) {
						testChunks.push(Buffer.from(chunk));
					}
					const { success } = JSON.parse(Buffer.concat(testChunks).toString("utf-8"));
					await reply.send({ success });
				} finally {
					// Destroy the submission container
					await submissionContainer.remove({
						force: true,
					});
				}
			},
			{ unsafeCleanup: true }
		);
	});
}
