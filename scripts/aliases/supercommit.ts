import { commandSync, sync } from 'execa';
import { parse } from 'shell-quote';

if (process.argv.length < 2) {
	console.error('You need to provide a commit message.');
	process.exit(1);
}

const args = process.argv.slice(2);

try {
	sync(
		'git',
		[...parse('submodule foreach git commit'), ...args] as string[],
		{
			stdout: process.stdout,
		}
	);
} catch {
	// empty
}

commandSync('git add backend');
sync('git', ['commit', ...args]);
