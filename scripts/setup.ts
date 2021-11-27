import execa from 'execa';
import fs from 'fs';
import path from 'path';

if (!fs.existsSync(path.join(__dirname, '../backend'))) {
	execa.commandSync('git clone git@github.com:Drill-Dev/drilldev-backend backend');
}
