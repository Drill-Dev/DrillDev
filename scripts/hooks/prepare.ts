#!/usr/bin/env -S npx ts-node-transpile-only --script-mode

import { commandSync } from 'execa';

import { updateAliases } from '../update-aliases';

export function prepare() {
	commandSync('pnpm exec husky install');
	updateAliases();
	commandSync('pnpm generate --filter=./backend');
}

if (require.main === module) {
	prepare();
}
