import fs from 'fs';
import path from 'path';

export function updateAliases() {
	const aliases = fs
		.readFileSync(path.join(__dirname, '../.gitalias'))
		.toString();

	function updateConfig(configPath: string, pathPrefix?: string) {
		const oldConfig = fs.readFileSync(configPath).toString();

		// Delete any old aliases from the config
		let newConfig = oldConfig.replace(/\[alias].*?(?=\[|$)/gs, '');

		let configAliases = aliases;
		if (pathPrefix !== undefined) {
			configAliases = aliases.replace(/(=\s*"!\w+\s+)/g, `$1${pathPrefix}/`);
		}

		newConfig += configAliases;

		fs.writeFileSync(configPath, newConfig);
	}

	updateConfig(path.join(__dirname, '../.git/config'));
	updateConfig(path.join(__dirname, '../.git/modules/backend/config'), '..');
}

if (require.main === module) {
	updateAliases();
}
