#!/usr/bin/env python3

import subprocess
import shlex

subprocess.check_call(shlex.split("git submodule foreach git push"))
subprocess.check_call(shlex.split("git push"))
