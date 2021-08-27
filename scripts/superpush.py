#!/usr/bin/env python3

import subprocess
subprocess.check_call("git submodule foreach git push".split())
subprocess.check_call("git push".split())
