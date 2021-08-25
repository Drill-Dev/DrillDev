# DrillDev

**Drill** **dev**elopment.

DrillDev is a site for practicing and measuring your software development abilities. As software developers, we aren't really concerned if you can implement a red-black tree or if you understand the Fast Fourier Transform. We want to measure your ability to develop apps that end users can use. While there are other metrics you can use to prove your skill in software development, such as internships and hackathon projects, they're ultimately impossible to compare between people, making it hard to see exactly how you rank among the millions of other software developers.

That's why we're creating DrillDev.

DrillDev is an open source project which aims to provide a way to practice and prove your software development skills. We're still in very early stages of development, and we're welcome to inviting new members on the team who are passionate about giving software development the same level of treatment as other aspects of computer science. If you're interested, feel free to send us an email at contact@drilldev.com!

Happy drilling!

## Technologies

### Frontend

**Build tool:** [Vite](https://vitejs.org)  
 - Vite's extremely fast development and build times help skyrocket developer productivity.
**JavaScript Framework:** [Vue 3](https://https://v3.vuejs.org/) - Vue is the easiest JavaScript framework to learn (out of the big 4) and it's SFC (single file components) syntax is much cleaner and more approachable than alternatives like JSX.
**CSS Framework:** [TailwindCSS](https://tailwindcss.com) - Makes it much easier and effortless to style components, as well as removes the need to think of arbitrary class names.
**HTML Preprocessor:** [Pug](https://pugjs.org) - Pug is cleaner and much less verbose than HTML, especially when using classes (e.g. for TailwindCSS).
**Language:** [TypeScript](https://www.typescriptlang.org/) - TypeScript make intellisense much more powerful (and consequently make development much more productive). They also eliminate a whole class of common programmer errors.

### Backend

**Runtime:** [Node.js](https://nodejs.org) - Node is the most popular JavaScript runtime, and has the largest ecosystem (e.g. compatible npm packages).
**Language:** [TypeScript](https://www.typescriptlang.org/) - TypeScript is invaluable when interacting with client requests (as we can define and enforce the exact arguments to pass to the backend through typings) and also makes working with the database a lot more manageable.
**Web Framework:** [Fastify](https://fastify.io) - Fastify is one of the fastest JavaScript web frameworks. It's also very flexible, very extensible, and better maintained than the alternatives.
**Database:** [PostgreSQL](https://www.postgresql.org/) - PostgreSQL is an extremely powerful relational database supported by Prisma (in addition, it's the 2nd most used database and the most loved database according to StackOverflow 2021 survey).
**Database ORM:** [Prisma](http://prisma.io/) - Prisma provides strong typing for interacting with the database, eliminating a ton of runtime SQL errors that result from incorrect types. It also works much more nicely with TypeScript compared to raw SQL, and it provides a built-in and easy way to handle database migrations.

### Other

**JavaScript package manager:** [Yarn](https://yarnpkg.com/) - Yarn is typically faster than npm (and has cleaner output), and works well with virtually all packages (unfortunately, pnpm didn't work well with Prisma).
**Containerization:** [Docker](https://docker.com) - Docker is the de-facto containerization software, making it easy to develop DrillDev regardless of what platform you're on. It also makes deploying to production a lot easier.
**Container Orchestration (tentative):** [Kubernetes](https://kubernetes.io) - Kubernetes is extremely easy to integrate into a DevOps workflow. It's also highly scalable, which will prove useful when we need to scale DrillDev servers during times of high-usage (e.g. before a popular drilldash).

## DrillDev Current & Future Plans

Currently, we're focusing on testing web applications using browser automation tools like Playwright. The submission code would bind to a port and render a webpage that would be subsequently tested using these browser automation tools. However, we're hoping to expand the scope of DrillDev in the future to testing applications like desktop applications to Android and iOS apps (after all, they still fall under the category of software development). This is a major reason why we're committed to developing DrillDev in the open; we believe that the community's breadth of knowledge in various different platforms will help grow the scope of DrillDev beyond what a small team could do.
