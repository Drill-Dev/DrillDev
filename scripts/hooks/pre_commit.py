import shlex
import subprocess

branch = subprocess.check_output(
    shlex.split("git rev-parse --symbolic-full-name --abbrev-ref HEAD"))

print(branch)

if branch == "dev":
	subprocess.check_call(shlex.split("yarn run lint-staged"))