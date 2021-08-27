import subprocess
subprocess.check_call("git pull")
subprocess.check_call("git submodule update --remote")
