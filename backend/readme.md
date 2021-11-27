# Backend

This is the TypeScript backend for DrillDev. To get started, install Node.js and Yarn and then install the backend dependencies using:

```shell script
yarn install
```

Then, to get the database running, you'll need to install Docker. Once you've installed Docker, navigate to the root folder and run:

```shell script
docker-compose up
```

Then, to apply migrations to the database, navigate to the `backend` folder and run:

```shell script
yarn migrate
```

Then, to start the server, run:

```shell script
yarn dev
```

## Technologies

**Runtime:** [Node.js](https://nodejs.org)

- Most popular JavaScript runtime
- Large ecosystem (e.g. compatible npm packages)

**Language:** [TypeScript](https://www.typescriptlang.org/)

- Invaluable when handling data from client requests (as we can define and enforce the exact arguments to pass to the backend through typings)
- Makes working with the database a lot safer

**Web Framework:** [Fastify](https://fastify.io)

- One of the fastest JavaScript web frameworks
- Very flexible and extensible
- Better maintained than the alternatives

**Database:** [PostgreSQL](https://www.postgresql.org/)

- Extremely powerful relational database
- Supported by Prisma
- 2nd most used database and the most loved database according to StackOverflow 2021 survey

**Database ORM:** [Prisma](http://prisma.io/)

- Provides strong typing for interacting with the database, eliminating a ton of runtime SQL errors that result from incorrect types
- Works much more nicely with TypeScript compared to raw SQL
- Provides a built-in and easy way to handle database migrations

**Containerization:** [Docker](https://docker.com)

- The de-facto containerization software
- Makes it easy to develop DrillDev regardless of what platform you're on
- Makes deploying to production a lot easier
- Eliminates the need to install dependencies (e.g. PostgreSQL) on the host machine

**Container Orchestration (tentative):** [Kubernetes](https://kubernetes.io)

- Extremely easy to integrate into a DevOps workflow
- Highly scalable, which will prove useful when we need to scale DrillDev servers during times of high-usage (e.g. before a popular drilldash)


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
