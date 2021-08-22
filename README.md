# DrillDev

**Drill** **dev**elopment.

DrillDev is similar to other computer science sites, except for one major difference. We want to test and measure software development abilities. As software developers, we aren't really concerned if you can implemtent a red-black tree or if you understand the Fast Fourier Transform. We want to measure your ability to develop apps that end users can use. While there are other metrics you can use to prove your skill in software development, such as internships and hackathon projects, they're ultimately impossible to compare between people, making it hard to see exactly how you rank among the millions of other software developers.

That's why we're creating DrillDev.

DrillDev is an open source project which aims to provide a way to practice and prove your software development skills. We're still in very early stages of development, and we're welcome to inviting new members on the team who are passionate about giving software development the same level of treatment as computer science. If you're interested, feel free to send us an email at contact@drilldev.com!

Happy drilling!

## Setup

Ensure you have [Docker](https://www.docker.com/) installed and on the PATH.

Clone this repository and `cd` inside it.

## IDE Configuration

To make DrillDev play nice with your IDE, run:

```shell script
poetry config virtualenvs.path null --local
poetry config virtualenvs.in-project true --local
```

## Running the Server

To run the server, run `docker-compose up backend`. This will build the backend container which contains the backend server for DrillDev.

Once the backend container is running, `exec` into the container using `docker exec drilldev_backend_1 -it bash`.

Then, from the `/root/app` directory, run `./scripts/start-server.sh`.
