#!/usr/bin/env python3

import subprocess
import shlex

subprocess.check_call(shlex.split("git submodule foreach git pull"))
subprocess.check_call(shlex.split("git pull"))
