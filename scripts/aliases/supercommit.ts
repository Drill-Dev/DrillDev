import { commandSync, sync } from 'execa';
import { parse } from 'shell-quote';

if (process.argv.length < 2) {
	console.error('You need to provide a commit message.');
	process.exit(1);
}

const args = process.argv.slice(2);

try {
	sync('git', [...parse('submodule for each git commit'), ...args] as string[]);
} catch {
	// empty
}

commandSync('git add backend');
sync('git', ['commit', ...args]);
