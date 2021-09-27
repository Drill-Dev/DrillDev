#!/usr/bin/env -S npx ts-node-transpile-only --script-mode

import { commandSync } from 'execa';

function precommit() {
	const branch = commandSync(
		'git rev-parse --symbolic-full-name --abbrev-ref HEAD'
	).stdout.toString();

	if (branch === 'dev') {
		commandSync('pnpm exec lint-staged', {
			stdout: process.stdout,
		});
	}
}

if (require.main === module) {
	precommit();
}
