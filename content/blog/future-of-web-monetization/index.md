---
title: "The Future of Web Advertisement: Web Monetization"
description: There's a new (proposed) web standard about advertising on the web. It's called Web Monetization, let's see what's all about.
tags: ["web monetization", "xrp", "crypto", "ilp", "future"]
keywords: ["web monetization", "xrp", "crypto", "ilp", "future"]
cover_image: https://images.unsplash.com/photo-1560152214-4e76ac668a11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
date: "2019-10-12T10:00:00.000Z"
id: "future-of-web-monetization"
---

There's a new (proposed) web standard about **advertising on the web**. It's called **Web Monetization**, let's see what's all about.

![The light at the end of the tunnel](https://images.unsplash.com/photo-1560152214-4e76ac668a11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)
> Photo by [Wendong Yao](https://unsplash.com/@atlasyao) on [Unsplash](https://unsplash.com/)

## What is Web Monetization

**Web Monetization** is a
> proposed browser API that uses ILP (**Interledger Protocol**) micropayments to monetize a site. It can be provided through a polyfill or an extension, but the goal is to eventually implement it directly into the user's browser.

## Motivation

> The ability to transfer money has been a long-standing omission from the web platform. As a result, the web suffers from a flood of advertising and corrupt business models. Web Monetization provides an open, native, efficient, and automatic way to compensate creators, pay for API calls, and support crucial web infrastructure.

## How Web Monetization can improve users satisfaction

Web Monetizatoin can improve the user overall satisfaction with your web content because he won't be perseguitated by your ads, and you still will make money from him.

In fact, Web Monetization, offers the user to chose where its web monetization funds should go when navigating the web.

## Web Monetization Wallets

At the moment these are the **Web Monetization Wallets** (wallets that accepts **ILP Payments**):

[![XRP Tipbot](https://firebasestorage.googleapis.com/v0/b/daudr-blog.appspot.com/o/future-of-web-monetization%2Ftipbot_logo.png?alt=media&token=8aab0f55-43fd-40c5-86bc-737b269dae4a)](https://www.xrptipbot.com/)

> XRP Tipbot

<!-- **XRP Tipbot** is a bot that lets users use the principles of web monetization platforms like Twitter, Discord and also your website. It's used also by **Coil** as we'll soon see. -->

[![GateHub](https://firebasestorage.googleapis.com/v0/b/daudr-blog.appspot.com/o/future-of-web-monetization%2Fgatehub_logo.png?alt=media&token=39082cb3-4d96-4971-b0c2-ed094931823f)](https://gatehub.net/)

> GateHub

[![Stronghold](https://firebasestorage.googleapis.com/v0/b/daudr-blog.appspot.com/o/future-of-web-monetization%2Fstronghold_logo.png?alt=media&token=da4d34a1-d874-4a6e-ae5b-ec156bd6f82e)](https://stronghold.co/)

> Stronghold

## Web Monetization Providers

[![Coil](https://firebasestorage.googleapis.com/v0/b/daudr-blog.appspot.com/o/future-of-web-monetization%2Fcoil.png?alt=media&token=d95f3a51-0700-430a-8c6d-fef703182a6a)](https://coil.com)

At the moment of writing this article, the only known **Web Monetization Provider** is **Coil**.

**Coil**, like [**Medium**](https://medium.com), is a platform when a person can share articles (or **web monetized links**) and offers a monthly fee for viewing a sort of pro members' articles only and for paying those web monetized links that you visit.

## How do I web monetize my own content? 💰

Implementing Web Monetization is quite easy, in fact, this consists in adding only a line to your html files. This new line is called **Web Monetization Meta Tag.**

### Setup a Web Monetization Wallet

In order to receive payments you need to set up a **Web Monetization Wallet**, you can use one of the above.

### Get your payment pointer

When you finish to set up your new account you'll receive a **Payment Pointer**. A Payment Pointer looks like this:

```$coil.xrptipbot.com/C3adA1B9Q5qMu4Z3i4Bfhw```

### Generate your Meta Tag

The Meta tag is the tag we're going to add to our web monetized web pages. This looks like this:

```html
<meta
  name="monetization"
  content="$coil.xrptipbot.com/C3adA1B9Q5qMu4Z3i4Bfhw">
```

> The tag's `name` have to be `monetization`

### Add your new Meta Tag to your pages

Copy your Meta Tag and add it to your websites `<head>` section. It should look like the example below:

```html
<!doctype html>
<html>
  <head>
    <title>Web Monetized Site</title>
    <meta
        name="monetization"
        content="$coil.xrptipbot.com/C3adA1B9Q5qMu4Z3i4Bfhw">
  </head>
  <!-- Other content -->
</html>
```

**Congragulations! Your website is now Web Monetized.** 😎😎😎
