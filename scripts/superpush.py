import subprocess
subprocess.check_call("git submodule foreach git push")
subprocess.check_call("git push")
