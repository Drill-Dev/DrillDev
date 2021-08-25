# DrillDev

**Drill** **dev**elopment.

DrillDev is a site for practicing and measuring your software development abilities. As software developers, we aren't really concerned if you can implement a red-black tree or if you understand the Fast Fourier Transform. We want to measure your ability to develop apps that end users can use. While there are other metrics you can use to prove your skill in software development, such as internships and hackathon projects, they're ultimately impossible to compare between people, making it hard to see exactly how you rank among the millions of other software developers.

That's why we're creating DrillDev.

DrillDev is an open source project which aims to provide a way to practice and prove your software development skills. We're still in very early stages of development, and we're welcome to inviting new members on the team who are passionate about giving software development the same level of treatment as other aspects of computer science. If you're interested, feel free to send us an email at contact@drilldev.com!

Happy drilling!

## Technologies

### Frontend

**Build tool:** [Vite](https://vitejs.org)

- Vite's extremely fast development and build times help skyrocket developer productivity

**JavaScript Framework:** [Vue 3](https://https://v3.vuejs.org/)

- Easy to learn
- SFC (single file component) syntax is cleaner and more approachable than alternatives like JSX

**CSS Framework:** [WindiCSS](https://windicss.org)

- Easier to style components
- Removes the need to think of arbitrary class names
- Consistent styles throughout the frontend
- TailwindCSS-compatible
- Works better with Vite than TailwindCSS

**HTML Preprocessor:** [Pug](https://pugjs.org)

- Cleaner and much less verbose than HTML
- Better syntax when using classes (especially for WindiCSS).

**Language:** [TypeScript](https://www.typescriptlang.org/)

- Makes intellisense much more powerful
- Makes development much more productive
- Eliminate a whole class of common programmer errors
- Serves partially as documentation

### Backend

**Runtime:** [Node.js](https://nodejs.org)

- Most popular JavaScript runtime
- Largest ecosystem (e.g. compatible npm packages).

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
- Provides a built-in and easy way to handle database migrations.

### Other

**JavaScript Package Manager:** [Yarn](https://yarnpkg.com/)

- Typically faster than npm
- Cleaner output than npm
- Compatible with virtually all packages (unfortunately, pnpm didn't work well with Prisma)

**Containerization:** [Docker](https://docker.com)

- The de-facto containerization software
- Makes it easy to develop DrillDev regardless of what platform you're on
- Makes deploying to production a lot easier
- Eliminates the need to install dependencies (e.g. PostgreSQL) on the host machine

**Container Orchestration (tentative):** [Kubernetes](https://kubernetes.io)

- Extremely easy to integrate into a DevOps workflow
- Highly scalable, which will prove useful when we need to scale DrillDev servers during times of high-usage (e.g. before a popular drilldash)

## DrillDev Current & Future Plans

Currently, we're focusing on testing web applications using browser automation tools like Playwright. The submission code would bind to a port and render a webpage that would be subsequently tested using these browser automation tools. However, we're hoping to expand the scope of DrillDev in the future to testing applications like desktop applications to Android and iOS apps (after all, they still fall under the category of software development). This is a major reason why we're committed to developing DrillDev in the open; we believe that the community's breadth of knowledge in various different platforms will help grow the scope of DrillDev beyond what a small team could do.
