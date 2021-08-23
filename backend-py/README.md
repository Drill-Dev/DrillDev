# DrillDev Backend

To install dependencies, run `poetry install`.

To start the server `poetry run server`.

## IDE Configuration

To make DrillDev play nice with your IDE, run:

```shell script
poetry config virtualenvs.path null --local
poetry config virtualenvs.in-project true --local
```

## How A Submission Works (Unformatted)

1. user uploads code to server
2. server determines the id of the submission by inserting an entry into the db and returning the id (which is an autoincrementing bigint)
3. server saves submission code to `/tmp/submission_<id>` or something
4. server creates a docker network with a name like `submission_network_<id>`
5. server spins up a submission container with the name `submission_container_<id>` to run the submission code and mounts `/tmp/submission_<id>` to `/root/app` and attaches it to the `submission_network_<id>` and exposes port 8080
6. the submission container runs the "build" script which installs all the dependencies and builds the app (which takes max 30s or else automatically killed)
7. the submission container then runs the "start" script and waits until the app has binded to the appropriate ports specified in the drill
8. server spins up a judging container with the name `submission_judge_container_<id>` and attaches it to the `submission_network_<id>`
9. the judging container runs the playwright code and targets the url `http://submission_container_<id>:<port>`
10. judging container returns result which is captured by flask server (or is automatically destroyed if TLE)
11. submission container is destroyed
12. submission network is destroyed
13. the result of the judging is saved into the DB and sent back to the client

