import shlex
import subprocess

branch = subprocess.check_output(
    shlex.split("git rev-parse --symbolic-full-name --abbrev-ref HEAD")
).decode('utf-8').strip()

if branch == "dev":
	subprocess.check_call(shlex.split("yarn run lint-staged"))