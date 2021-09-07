import { commandSync } from 'execa';

commandSync('git submodule foreach git push');
commandSync('git push');
