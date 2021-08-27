#!/usr/bin/env python3

import sys
import subprocess
import os

if len(sys.argv) < 2:
    sys.exit("You need to provide a commit message")
msg = sys.argv[1]

os.system("git submodule foreach git add -A")
os.system(f'git submodule foreach git commit -am "{msg}"')

os.system("git add -A .")
os.system(f'git commit -am "{msg}"')
