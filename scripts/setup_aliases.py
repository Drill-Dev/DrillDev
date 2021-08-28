#!/usr/bin/env python3

import pathlib

cwd = pathlib.Path.cwd()

with open(cwd / ".git/config", mode="a") as file:
	file.write('''\
		[include]
			path = ../.gitalias
	''')
with open(cwd / ".git/modules/backend/config", mode="a") as file:
	file.write('''
		[include]
			path = ../../../.gitalias
	''')
