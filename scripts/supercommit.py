#!/usr/bin/env python3

import sys
import subprocess
import shlex

if len(sys.argv) < 2:
	sys.exit("You need to provide a commit message")
args = sys.argv[1:]

try:
	subprocess.check_call(
	    shlex.split("git submodule foreach git commit") + args)
except:
	pass

subprocess.check_call(shlex.split("git add backend"))
subprocess.check_call(shlex.split("git commit") + args)
