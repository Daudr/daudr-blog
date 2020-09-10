---
title: 'Set a shared background in your Flutter app'
description: These times I started building apps for my clients in Flutter, I have to say that for the time being I'm in love with this library that Google has built. But I was having an hard time figuring out how to set a background that would persint in various pages of my app.
tags: ['flutter', 'app', 'android', 'ios', 'scaffold']
keywords: ['flutter', 'app', 'android', 'ios', 'scaffold']
cover_image: https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=1950&q=80
date: '2020-09-10T10:00:00.000Z'
id: 'flutter-shared-background'
---

These times I started building apps for my clients in [Flutter](https://flutter.dev), I have to say that for the time being I'm in love with this library that Google has built. But I was having an hard time figuring out how to set a background that would persint in various pages of my app.
Keep reading to learn how I did it in my latest apps.

![Set the right background for your app](https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=1950&q=80)

> Photo by [Efe Kurnaz](https://unsplash.com/@efekurnaz) on [Unsplash](https://unsplash.com)

## Understading flutter: Widgets

Flutter is made of `Widgets`, these are like lego bricks, you put one above each other to build your unique app interface.
The basic widget of Flutter is `MaterialApp` if your using Material design, this widget tells how to render the App on the phones and which pages you can navigate to, if you use named navigator (highly recommended).

## Scaffold widget to the rescue

Another basic widget that you'll find in every Flutter application is `Scaffold`, it lets you put your widgets on the screen, and it has natively implementations of `AppBars`, `BottomNavigationsAppBars` and `Drawers`. That's really something awesome.
So lets keep it up, each `Scaffold` has one required field: `body`, it's a generic `Widget` that'll be put at the top left on your screen if you don't tell nothing to Flutter.

Here's an example:

```dart
import 'package:flutter/material.dart';

class MyScaffold extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(),
        body: Container(
          child: Text('Hi world!'),
        ));
  }
}
```

This basically tells to render a Text on the top left of your screen. See it yourself:

![A scaffold saying Hi world!](https://firebasestorage.googleapis.com/v0/b/daudr-blog.appspot.com/o/flutter-shared-background%2Fscaffold.png?alt=media&token=b0263e1a-298b-475e-a843-1da6773ca07f)

That been said it's time to pass to the argument of this post, how can we use the informations we have to share an image as background throughout our application?
The answer is quite simple really, all we have to do is use another basic flutter's widget: `Stack`.

## Another widget: Stack

What Stack allows us to do is simpli put widgets on top of each other.
There are three ways to render our widgets in flutter: `Row`, `Column` and `Stack`, but that's not the argument of this post and the informations about these widget can be easily seen on flutter documentation.

## How can we use Stack for our porpuse

What can we do now is use the Scaffold widget to render a body with a Stack by default, and the stack children being an `Image` widget and a `Container` widget.
The Image widget will render an image which will cover all of our phone's screen and the Container will take all the screen's space to render other widgets on top of ou image, using it as a background.
Here's the code:

```dart
import 'package:flutter/material.dart';

class MyScaffold extends StatelessWidget {
  final Widget child;
  final String image;

  ModelToysScaffold(
      {@required this.child,
      this.image = 'assets/images/background.png',});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(), =>
      body: Stack(
        children: [
          Positioned(
            top: 0,
            child: Image.asset(
              image,
              height: MediaQuery.of(context).size.height,
              width: MediaQuery.of(context).size.width,
              fit: BoxFit.cover,
            ),
          ),
          Container(
            width: MediaQuery.of(context).size.width,
            height: MediaQuery.of(context).size.height,
            child: child,
          ),
        ],
      ),
    );
  }
}
```

Here's the result:

![Our text has now a background](https://firebasestorage.googleapis.com/v0/b/daudr-blog.appspot.com/o/flutter-shared-background%2Fscaffold-background.png?alt=media&token=6846a0fd-e091-442a-8689-f17289875978)

What do you think of this approach?
Let me know in the comments! 😉