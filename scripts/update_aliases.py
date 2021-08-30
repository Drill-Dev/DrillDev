#!/usr/bin/env python3

import pathlib
import re

cwd = pathlib.Path.cwd()
aliases = open(cwd / '.gitalias', 'r').read()

def update_config(config_path: str, path_prefix: str = None):
	old_config = open(config_path, "r").read()

	# Clear the file
	file = open(config_path, 'w')

	# Delete any old aliases from the config
	remove_alias_re = re.compile(r'\[alias\].*?(?=\[|$)', re.DOTALL)
	new_config = re.sub(remove_alias_re, '', old_config)

	config_aliases = aliases
	if path_prefix != None:
		assign_alias_re = re.compile(r'(=\s*"!\w+\s+)')
		config_aliases = re.sub(assign_alias_re, r'\1' + f'{path_prefix}/', aliases)

	# Append the most recent aliases (from the .gitalias file)
	new_config += config_aliases

	# Overwrite the config file with the new config
	file.write(new_config)


update_config(cwd / ".git/config")
update_config(cwd / ".git/modules/backend/config", path_prefix="..")