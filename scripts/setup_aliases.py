#!/usr/bin/env python3

import pathlib

cwd = pathlib.Path.cwd()
add = '''\
[include]
	path = ../.gitalias
'''

with open(cwd / ".git/config", mode="a") as file:
	file.write(add)
with open(cwd / ".git/modules/backend/config", mode="a") as file:
	file.write(add)
