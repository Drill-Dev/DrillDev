import sys
import subprocess

if len(sys.argv) < 2:
    sys.exit("You need to provide a commit message")
msg = sys.argv[1]

subprocess.check_call("git submodule foreach git add -A .")
subprocess.check_call(f'git submodule foreach git commit -am "{msg}"')

subprocess.check_call("git add -A .")
subprocess.check_call(f'git commit -am "{msg}"')
