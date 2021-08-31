import os

os.system('yarn run husky install')
os.system('python ./scripts/update_aliases.py')
os.system('yarn workspace backend generate')