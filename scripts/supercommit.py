#!/usr/bin/env python3

import sys
import subprocess
import os

if len(sys.argv) < 2:
    sys.exit("You need to provide a commit message")
msg = sys.argv[1]

subprocess.check_call("git submodule foreach git add -A .".split())
subprocess.check_call("git submodule foreach git commit -am".split() + [msg])

subprocess.check_call("git add -A .".split())
subprocess.check_call("git commit -am".split() + [msg])
