---
title: "Create your first GatsbyJS Plugin"
description: There's a new (proposed) web standard about advertising on the web. It's called Web Monetization, let's see what's all about.
tags: ["gatsbyjs", "plugin", "web monetization", "guide", "code"]
keywords: ["gatsbyjs", "plugin", "web monetization", "guide", "code"]
cover_image: https://images.unsplash.com/photo-1494059980473-813e73ee784b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80
date: "2019-10-14T10:00:00.000Z"
id: "create-gatsby-plugin"
---

In the [last article](https://blog.daudr.me/future-of-web-moentizetion) I introduced the new (proposed) web standard per **Web Monetizatio**. In this new article we'll se how we can create a simple **GatsbyJS Plugin** to inject the **Web Monetization Meta Tag** using the **SSR APIs**.

![Add a piece to the puzzle](https://images.unsplash.com/photo-1494059980473-813e73ee784b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80)

> Photo by [Hans-Peter Gauster](https://unsplash.com/@sloppyperfectionist) on [Unsplash](https://unsplash.com)

## Create the plugin files

We can read from the official plugins docs that a plugin project has to comprehend some files:

- `package.json` - **required** this can be an empty object (`{}`) for local plugins.
  Also, your `package.json` file should have the following properties:
  - `name` is used to identify the plugin when it mutates Gatsby’s GraphQL data structure  
    if `name` isn’t set, the folder name for the plugin is used
  - `main` is the [name of the file that will be loaded when your module is required by another application](https://docs.npmjs.com/creating-node-js-modules#create-the-file-that-will-be-loaded-when-your-module-is-required-by-another-application)  
    if `main` isn’t set, a default name of `index.js` will be used  
    if main isn’t set, it is recommended to create an empty index.js file with the contents //no-op (short for no-operation), as seen in [this example plugin](https://github.com/gatsbyjs/gatsby/tree/817a6c14543c73ea8f56c9f93d401b03adb44e9d/packages/gatsby-source-wikipedia)
  - `version` is used to manage the cache — if it changes, the cache is cleared  
    if `version` isn’t set, an MD5 hash of the `gatsby-*` file contents is used to invalidate the cache  
    omitting the `version` field is recommended for local plugins
  - `keywords` is used to make your plugin discoverable  
    plugins published on the npm registry should have `gatsby` and `gatsby-plugin` in the keywords field to be added to the [Plugin Library](https://www.gatsbyjs.org/packages/)
- `gatsby-browser.js` — usage details are in the [browser API reference](https://www.gatsbyjs.org/docs/browser-apis/)
- `gatsby-node.js` — usage details are in the [Node API reference](https://www.gatsbyjs.org/docs/node-apis/)
- `gatsby-ssr.js` — usage details are in the [SSR API reference](https://www.gatsbyjs.org/docs/ssr-apis/)

For the sake of these plugin we'll use only the SSR APIs therefore the only file we need to have is the `gatsby-ssr.js`' one.

## Using SSR APIs

As already said we'll create a plugin that'll need only the SSR APIs, GatsbyJS expose these APIs:

- `onPreRenderHTML`
- `onRenderBody`
- `replaceRenderer`
- `wrapPageElement`
- `wrapRootElement`

In our plugin we'll use only the `onPreRenderHTML` in order to add the **Web Monetization Meta Tag** in the `<head>` section of our pages.
This API gives us two methods we can use to do what we need:

- `getHeadComponents` - return the `headComponents` array, formed by `ReactNode` objects
- `replaceHeadComponents` - Takes an array of components as its first argument which replace the headComponents array which is passed to the `html.js` component.

You can read more on these in the official docs.

## Create our SSR file

At the end our `gatsby-ssr.js` should look like this:

```javascript
const React = require("react")

exports.onPreRenderHTML = (
  { getHeadComponents, replaceHeadComponents },
  pluginOptions
) => {
  const headComponents = getHeadComponents()

  const excludedPaths = pluginOptions.excludedPaths

  const webMonetizationTag = (
    <meta name="monetization" content={pluginOptions.paymentPointer} />
  )

  headComponents.push(webMonetizationTag)

  replaceHeadComponents(headComponents)
}
```

## Publish your new plugin on NPM

In order to publish your new plugin on NPM and be discovered by its users

## That's all 😎😎😎

Congratulations! You've created your first GatsbyJS plugin.
