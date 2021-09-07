import { commandSync } from 'execa';

commandSync('git submodule foreach git pull');
commandSync('git pull');
