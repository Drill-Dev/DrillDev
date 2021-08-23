import Docker from 'dockerode';
import { FastifyInstance } from 'fastify';
import fs from 'fs-extra';
import got from 'got';
import path from 'path';
import playwright from 'playwright';
import { pipeline } from 'stream';
import stringArgv from 'string-argv';
import { dir } from 'tmp-promise';
import util from 'util';
import waitPort from 'wait-port';

const pump = util.promisify(pipeline);

const docker = new Docker();

export default async function drillSubmitRoute(app: FastifyInstance) {
	app.post('/run', async (request, reply) => {
		const { path: dirPath } = await dir();
		const data = await request.file();

		await pump(
			data.file,
			fs.createWriteStream(path.join(dirPath, 'index.html'))
		);

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
			await submissionContainer.remove({
				force: true,
			});
		}
	});
}
