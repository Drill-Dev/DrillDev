import subprocess
import shlex
import sys

message = sys.argv[1]
subprocess.check_call(shlex.split("yarn run commitlint --edit") + [message])
