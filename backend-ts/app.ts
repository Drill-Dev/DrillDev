import fastify from 'fastify';
import Docker from 'dockerode';
import { dir } from 'tmp-promise';
import fastifyMultipart from 'fastify-multipart';
import playwright from 'playwright';
import fs from 'fs-extra';
import path from 'path';
import fastifyCors from 'fastify-cors';
import { pipeline } from 'stream';
import util from 'util';
import stringArgv from 'string-argv';
import waitPort from 'wait-port';

const pump = util.promisify(pipeline);

const app = fastify({
	logger: true,
});
app.register(fastifyMultipart);
app.register(fastifyCors);

const docker = new Docker();

app.post('/run', async (request, reply) => {
	const { path: dirPath } = await dir();
	const data = await request.file();

	await pump(data.file, fs.createWriteStream(path.join(dirPath, 'index.html')));

	await docker.getImage('python:3.8');
	const submissionContainer = await docker.createContainer({
		Image: 'python:3.8',
		Cmd: stringArgv('python -m http.server -d /root/html 80'),
		ExposedPorts: { '80/tcp': {} },
		HostConfig: {
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

	// Wait for ports to become available
	await waitPort({
		host: 'localhost',
		port: 8080,
	});

	const browser = await playwright.chromium.launch();
	try {
		const page = await browser.newPage();
		await page.goto('localhost:8080');
		await page.setDefaultTimeout(3000);
		await page.click("text='Login'");

		await reply.send({
			status: 'AC',
		});
	} catch (e) {
		console.error(e);
		if (e instanceof playwright.errors.TimeoutError) {
			await reply.send({
				status: 'TLE',
			});
		} else {
			await reply.send({
				status: 'IE',
			});
		}
	} finally {
		await browser.close();
		await submissionContainer.stop();
		await submissionContainer.remove({
			Force: true,
		});
	}
});

app.listen(5000, (err, address) => {
	console.log(`Listening at ${address}`);
});
