#!/usr/bin/env python3

import sys
import subprocess

if len(sys.argv) < 2:
    sys.exit("You need to provide a commit message")
msg = sys.argv[1]

subprocess.check_call("git submodule foreach git commit -m".split() + [msg])

subprocess.check_call("git add backend".split())
subprocess.check_call("git commit -m".split() + [msg])
