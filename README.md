# DrillDev

**Drill** **dev**elopment.

DrillDev is a site for practicing and measuring your software development abilities. As software developers, we aren't really concerned if you can implement a red-black tree or if you understand the Fast Fourier Transform. We want to measure your ability to develop apps that end users can use. While there are other metrics you can use to prove your skill in software development, such as internships and hackathon projects, they're ultimately impossible to compare between people, making it hard to see exactly how you rank against other software developers.

That's why we're creating DrillDev.

DrillDev is an project which aims to provide a way to practice and prove your software development skills. We're still in very early stages of development, and we're welcome to inviting new members on the team who are passionate about giving software development the same level of treatment as other aspects of computer science. If you're interested, feel free to send us an email at contact@drilldev.com!

Happy drilling!

## Setup

To get started with developing DrillDev, first clone the repository:

```shell script
git clone --recurse-submodules git@github.com:Drill-Dev/drilldev.git
```

Then, make sure you have [Yarn](https://yarnpkg.com/) installed and run the following command from the root of the repository:

```shell script
yarn setup
```

This will set up git aliases that make committing changes across submodules easier. You can find a list of the current git aliases in the `.gitalias` file.

## Technologies

### Frontend

**Build tool:** [Vite](https://vitejs.dev)

- Extremely fast development and build times help skyrocket developer productivity

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
- Better syntax when using classes (especially for WindiCSS)

**Language:** [TypeScript](https://www.typescriptlang.org/)

- Makes intellisense much more powerful
- Makes development much more productive
- Eliminate a whole class of common programmer errors
- Serves partially as documentation

### Other

**JavaScript Package Manager:** [Yarn](https://yarnpkg.com/)

- Typically faster than npm
- Cleaner output than npm
- Compatible with virtually all packages (unfortunately, pnpm didn't work well with Prisma)

## Current & Future Plans

Currently, we're focusing on testing web applications using browser automation tools like Playwright. The submission code would bind to a port and render a webpage that would be subsequently tested using these browser automation tools. However, we're hoping to expand the scope of DrillDev in the future to testing applications like desktop applications to Android and iOS apps (after all, they still fall under the category of software development).
