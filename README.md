# Daudr Blog

![CircleCI](https://img.shields.io/circleci/build/github/Daudr/daudr-blog/master.svg?label=CircleCI%20PROD)
![CircleCI](https://img.shields.io/circleci/build/github/Daudr/daudr-blog/develop.svg?label=CircleCI%20TEST)

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FDaudr%2Fdaudr-blog.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FDaudr%2Fdaudr-blog?ref=badge_large)

## 🚀 Quick start

1. **Clone this repo**

    Use the Gatsby CLI to create a new site, specifying the blog starter.

    ```sh
    git clone https://github.com/Daudr/daudr-blog
    ```

1. **Edit you .env files**
  In order for this project to work you need to create two files:

    * `.env.development`

      Contains the tokens used by `gatsby-config.js` when launching `gatsby develop`

    * `.env.production`

      Contains the tokens used by `gatsby build`

  You can refer to the tokens in the `.env.example` as examples.

1. **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```sh
    cd daudr-blog
    gatsby develop
    ```

1. **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

    Open the `daudr-blog` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── .env.example

1. **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2. **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3. **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4. **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5. **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6. **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7. **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8. **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9. **`LICENSE`**: Gatsby is licensed under the MIT license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

## 🎓 Learning Gatsby

13. **`.env.example`**: Contains the example tokens used by `gatsby-config.js`

## Run Tests

This project comes with a full set of tests

### Unit tests

Just type in your terminal:
`npm run test`

### E2E tests

Just type in your terminal:
`npm run test:e2e`
