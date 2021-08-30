import shlex
import subprocess

subprocess.check_call(shlex.split("yarn run husky install"))
subprocess.check_call(shlex.split("python ./scripts/update_aliases.py"))
subprocess.check_call(shlex.split("yarn workspace backend generate"))