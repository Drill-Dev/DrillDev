import { commandSync } from 'execa';

import { updateAliases } from '../update-aliases';

export function prepare() {
	commandSync('yarn run husky install');
	updateAliases();
	commandSync('yarn workspace backend generate');
}

if (require.main === module) {
	prepare();
}
