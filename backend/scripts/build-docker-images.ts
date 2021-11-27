import { commandSync } from 'execa';
import fs from 'fs';
import path from 'path';

const dockerfilesPath = path.join(__dirname, '../dockerfiles');
for (const dockerfile of fs.readdirSync(dockerfilesPath)) {
	const { name, ext } = path.parse(dockerfile);
	if (ext !== '.dockerfile') continue;

	commandSync(
		`docker build --tag drilldev-${name}:latest --file ${path.join(
			dockerfilesPath,
			dockerfile
		)} ${dockerfilesPath}`
	);
}
