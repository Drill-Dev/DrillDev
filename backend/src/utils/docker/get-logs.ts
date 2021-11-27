import type { Container } from 'dockerode';

export async function getLogs(container: Container) {
	const logStream = await container.logs({
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

	return logs;
}
