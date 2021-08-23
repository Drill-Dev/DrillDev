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
