import shlex
import subprocess

branch = str.strip(
    subprocess.check_output(
        shlex.split("git rev-parse --symbolic-full-name --abbrev-ref HEAD")).
    decode('utf-8'))

if branch == "dev":
	subprocess.check_call(shlex.split("yarn run lint-staged"))