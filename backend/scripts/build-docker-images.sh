

dockerfiles_path="$(dirname "$0")/../dockerfiles"

docker build -t drilldev-js-playwright:latest - < $dockerfiles_path/js-playwright.Dockerfile
docker build -t drilldev-port-check:latest - < $dockerfiles_path/port-check.Dockerfile
docker build -t drilldev-py-playwright:latest - < $dockerfiles_path/py-playwright.Dockerfile
