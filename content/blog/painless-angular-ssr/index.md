---
title: "Painless Angular SSR with Nginx/Apache/Firebase & Angular CLI"
description: So you're building a new, phantasmagorical web site (let's say a brand new e-commerce for those absolutely unknown books that you find perfect) and you need your future clients to find it on the first search page on Google.
tags: ["angular", "ssr", "firebase", "nginx", "apache"]
keywords: ["angular", "ssr", "firebase", "nginx", "apache"]
cover_image: https://images.unsplash.com/photo-1544986581-efac024faf62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
date: "2019-08-12T10:00:00.000Z"
id: "painless-angular-ssr"
---

So you're building a new, phantasmagorical web site (let's say a brand new e-commerce for those absolutely unknown books that you find beautifully written) and you need your future clients to find it on the first search page on Google.

![Serve your Angular app right](https://images.unsplash.com/photo-1544986581-efac024faf62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)
> Photo by [Alev Takil](https://unsplash.com/@alevtakil) on [Unsplash](https://unsplash.com)

After a lot of research, you decided to use Angular as FE framework because you think it's the best fit for that e-commerce, but when you finally deploy it on production and you search it, you don't find even if it's some time that's been published, what's going on?

Google recently updated its crawler to pre-render javascript Single Page Applications like Angular ones, but this technology doesn't always work well (and you need to know that not everybody uses Google to surf the Internet).

## Angular Universal to the rescue

Fortunately, the Angular Team built a nice (after some initial troubles) tool that helps us, a tool called [Angular Universal](https://angular.io/guide/universal).

### Setting things up

Setting Angular Universal up is relatively easy, you just have to type a single command in your terminal

`ng add @nguniversal/express-engine --clientProject "your project that neeeds SSR"`

This little command generates some files in your `src/` folder:

- `main.server.ts` -  Bootstrapper of the server app
- `app/app.server.module.ts`  -  Server-side app module
- `server.ts` -  Express web server
- `ts.config.server.json` -  Typescript config for your server app
- `webpack.server.config.js` -  Webpack server configuration

### Verify if the SSR app works

To verify if your brand new Server-Side rendered app will work, type in your terminal

```bash
npm run build:ssr
npm run serve:ssr
```

If all works well (you'd be really lucky) you should see the app working on `localhost:4000`, else continue reading to know some error catching.

## Catching SSR errors

There are plenty of errors that could occur while trying to build our SSR app, let's try to understand the most common ones.

### Using browser only namespaces

When the app is running in our server there are some standard objects that we cannot use, ie `window`, so we can do two things:

1. Inject false objects to "deceive" the server and make our app working even on the server-side, to do this simply add these lines before the `express()` initialization in your `server.ts` file:

    ```typescript
    ...
    const domino = require('domino');
    const fs = require('fs');
    const path = require('path');
    const templateA = fs.readFileSync(path.join('dist/browser', 'index.html')).toString();
    const win = domino.createWindow(templateA);
    win.Object = Object;
    win.Math = Math;
    global['window'] = win;
    global['document'] = win.document;
    global['branch'] = null;
    global['object'] = win.object;
    const app = express();
    ...
    ```

2. Detect the parts where you're using these objects and make them run only in your browser app.
    In this case Angular makes us available two methods `isPlatformBrowser` and `isPlatformServer` exposed by `@angular/common`.
    Here's a little example:

    ```typescript
    import { Component, Inject, PLATFORM_ID } from '@angular/core';
    import { isPlatformBrowser } from '@angular/common';

    @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
    })
    export class AppComponent {
        constructor(@Inject(PLATFORM_ID) private platformId: any) {}

        onActivate(event: any) {
            if (isPlatformBrowser(this.platformId)) {
                const scrollToTop = window.setInterval(() => {
                    const pos = window.pageYOffset;
                    if (pos > 0) {
                        window.scrollTo(0, pos - 50);
                    } else {
                        window.clearInterval(scrollToTop);
                    }
                }, 16);
            }
        }
    }
    ```

    This snippet runs the scrollTop only if this code runs on the browser.

## Finish this all: Deploy to production

The best part arrived, the part where I'll walk you through server configuration, isn't it awesome?

### Apache Configuration

If you're using Apache as the webserver you need to create or modify your `.htaccess` file:

```htaccess
<IfModule mod_rewrite.c>
 RewriteEngine On
 # If an existing asset or directory is requested go to it as it is
 RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
 RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
 RewriteRule ^ - [L]

 RewriteRule ^ /dist/browser/index.html
</IfModule>
<VirtualHost *:80>
 ServerName example.com # <-- modify here
 ServerAlias www.example.com # <-- modiy here
 <Proxy *>
  Order allow,deny
  Allow from all
 </Proxy>
 ProxyPreserveHost On
 ProxyRequests Off
 ProxyPass / http://localhost:4000/
 ProxyPassReverse / http://localhost:4000/
</VirtualHost>

<VirtualHost *:443>
 ServerName example.com # <-- modify here
 ServerAlias www.example.com # <-- modify here
 <Proxy *>
  Order allow,deny
  Allow from all
 </Proxy>
 ProxyPreserveHost On
 ProxyRequests Off
 ProxyPass / https://localhost:4000/
 ProxyPassReverse / https://localhost:4000/
</VirtualHost>
```

### Nginx configuration

In case you using Nginx instead you need to configure the configuration under the `/etc/nginx/sites-available/www.example.com` file:

```nginx
upstream your_upstream_config {
 server 127.0.0.1:4000;
}

server {
 listen 443 ssl http2;
 server_name www.example.com; # <--- modify here
 root /home/"your user"/path/to/dist/browser;
 location / {
  try_files $uri $uri @backend;
 }

 location @backend {
  proxy_pass http://your_upstream_config;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header Host $http_host;
  proxy_http_version 1.1;
  proxy_set_header X-NginX-Proxy true;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
  proxy_cache_bypass $http_upgrade;
  proxy_redirect off;
  proxy_set_header X-Forwarded-Proto $scheme;
 }
}

server {
 listen 80;
 server_name www.example.com # <-- modify here
 return 301 https://$server_name$request_uri?;
}
```

## Bonus - Firebase config 🤩🤩🤩

If you're using Firebase hosting there are some things we have to add and two ways you can accomplish what you've already done with Apache or Nginx: AppEngine or Cloud Functions.

### Polyfills your firebase project

Firebase uses Websockets and XHR not included in Angular that we need to polyfill. So we run in our terminal:

```bash
npm install ws xhr2 bufferutil utf-8-validate -D
```

and we add these two new lines to our `server.ts` files:

```typescript
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xhr2');
...
```

### Deploy on AppEngine

Add a `app.yaml` at the root of the project with this line:

```yaml
runtime: nodejs10
```

And then, after you install the Google Cloud CLI, run in your terminal:

```bash
gcloud app deploy
```

We also need to change the `start` script in our `package.json`:

```json
// ...
"scripts": {
  "start": "npm run serve:ssr",
  // ...
},
// ...
```

And that's all, you should see your app running on Google Cloud! 👌

### Using Firebase Cloud Functions

In order to deploy our app using Firebase Cloud Functions we need to init it and modify some files:

To init Firebase run

```bash
firebase init
```

and select `hosting` and `functions`

Then modify your `funtions/package.json` file:

```json
{
  "hosting": {
    // ...
    "rewrites": [
      { "source": "**", "funtion": "ssr" }
    ]
  },
    // ...
}
```

Remove your express listener in `server.ts`:

```typescript
// Start up the Node server
// app.listen(PORT, () => {
//   console.log(`Node Express server listening on http://localhost:${PORT}`);
// })
```

Update your `webpack.server.config.js`:

```javascript
output: {
  // Puts the output at the root of the dist folder
  path: path.join(__dirname, 'dist'),
  library: 'app',
  libraryTarget: 'umd',
  filename: '[name].js',
},
```

Make sure to rebuild your app running `npm run build:ssr`

We then move in our `functions` directory to install `fs-extra`

```bash
cd functions
npm install fs-extra --save
```

The Firebase function needs to access our built app, so let's create a simple node script called `cp-angular,js` that copies our app in the `functions` folder:

```javascript
const fs = require('fs-extra');

(async() => {

    const src = '../dist';
    const copy = './dist';

    await fs.remove(copy);
    await fs.copy(src, copy);

})();
```

Then in our `functions/package.json` we add a `build` script:

```json
{
  "name": "functions",
  "engines": {
    "node": "10"
  },
  "scripts": {
    "build": "node cp-angular && tsc"
  }
}
```

Then we can finally write our functions, so our `functions/index.js` file will look something like this:

```javascript
import * as functions from 'firebase-functions';
const universal = require(`${process.cwd()}/dist/server`).app;

export const ssr = functions.https.onRequest(universal);
```

To verify that all is working right you can use these commands:

```bash
cd functions
npm run build
firebase serve
```

And if all looks good just deploy it:

```bash
firebase deploy
```

## Done! 😎

That's all, you're now a master of Angular Universal!
