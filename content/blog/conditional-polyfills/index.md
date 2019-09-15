---
title: Conditional Polyfill in Angular v7
description: How to enable conditional polyfills loading in an Angular v7 project
tags: ['angular', 'performance', 'cli', 'code', 'guide']
keywords: ['angular', 'conditional polyfills', 'performance', 'cli', 'code', 'guide']
cover_image: https://images.unsplash.com/photo-1511715282680-fbf93a50e721?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
date: "2019-05-18T09:27:10.759Z"
id: "conditional-polyfills"
---

If you have a project that's based on Angular v7 and don't have the chance to upgrade to the upcoming v8 or you want to test one of the most useful small features of the future version here you will find how to do it.

![Dance of souls](performance.jpg)
> Photo by [Ahmad Odeh](https://unsplash.com/photos/JhqhGfX_Wd8) on [Unsplash](https://unsplash.com)

## The trick

In the development of Angular, we’re using TypeScript with a lot of modern JavaScript features. Not all of them are supported by the users’ browsers so that’s why as part of the production build we ship a file called polyfills.js.

Over the past couple of years, browsers started implementing a lot of these APIs. The chances are that a user who’s on the latest version of Chrome, for instance, will not need any of the ES2015 polyfills that we ship as part of polyfills.js. Instead, their browser will support them natively. This makes large portion of the content of polyfills.js obsolete and unnecessary.

That’s why, starting from Angular CLI 7.3.0, it was introduced conditional polyfill loading! As part of the default build process, Angular CLI will produce two bundles polyfills.js and es2015-polyfills.js. polyfills.js includes only the polyfills required by the browsers which have all the ES2015 features implemented natively. In contrast, es2015-polyfills.js contains all the polyfills from polyfills.js + ES2015 ones (such as Map, Set, etc).

The result should be your `index.html`'s body looking like this:

```html
<body>
  <app-root></app-root>
  <script type="text/javascript" src="runtime.***.js"></script>
  <script type="text/javascript" src="es2015-polyfills.***.js" nomodule></script>
  <script type="text/javascript" src="polyfills.***.js"></script>
  <script type="text/javascript" src="main.***.js"></script>
</body>
```

On the snippet above, you can see that Angular CLI has added the `nomodule` attribute to the es2015 polyfills tag. This attribute let the browsers download and execute the script only if it doesn't recognize the [module script web api](https://html.spec.whatwg.org/multipage/webappapis.html#module-script), this means that the browser is old 👌

## What if my users don't use such old browsers?

You might be wondering: all my users are with modern browsers, why would I have to wait for the CLI to produce es2015-polyfills.js that will never be in use? If you’re really thinking this, then you’re a happy developer. If you want to ignore ES2015 polyfills completely, then build your application running:

`ng build --es5BrowserSupport=false`

By setting the --es5BrowserSupport flag to false, Angular CLI will produce only polyfills.js which contains the polyfills required by ES2015 enabled browsers, but your app won't work properly on those old browsers anymore.

If you don't want to set the property every time you run the build command, you can directly modify the property in your `angular.json` file:

```json
"projects": {
    "project-name": {
      ...
      "architect": {
        "build": {
          ...
          "options": {
            ...
            "es5BrowserSupport": false,
```

This trick lets you save the scripting of about 60Kb of javascript 😎
