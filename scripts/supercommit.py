#!/usr/bin/env python3

import sys
import subprocess

if len(sys.argv) < 2:
    sys.exit("You need to provide a commit message")
args = sys.argv[1:]

try:
    subprocess.check_call("git submodule foreach git commit".split() + args)
except:
    pass

subprocess.check_call("git add backend".split())
subprocess.check_call("git commit".split() + args)
