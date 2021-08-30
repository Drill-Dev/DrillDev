import shlex
import subprocess

subprocess.check_call(shlex.split("husky install"))
subprocess.check_call(shlex.split("python3 ./scripts/update_aliases.py"))