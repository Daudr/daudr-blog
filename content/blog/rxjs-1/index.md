---
title: "[RxJS Series] The first() of many observables"
description: In this series of posts I'll explain the basic functionalities of some RxJS' features
tags: ['angular', 'performance', 'rxjs', 'combineLatest', 'forkJoin', 'takeUntil']
keywords: ['angular', 'performance', 'rxjs', 'combineLatest', 'forkJoin', 'takeUntil']
image: 'performance.jpg'
date: "2019-05-18T09:27:10.759Z"
---

When we are working on an Angular project we'll obviously have to face RxJS, it’s just there waiting for us.

Let's find what rxjs is, from the [docs](https://rxjs-dev.firebaseapp.com):
> RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code.

## But what are Observables

> Observables are lazy Push collections of multiple values.

## combineLatest

The `combineLatest` operator is used to merge multiple observable streams into only one

## forkJoin

## takeUntil

`takeUntil` is a lot popular in Angular when we are dealing with subscription and performance issues. takeUntil is used where we generate a `Subscription` (maybe an Http call) and we need to unsubscribe when we don't use it anymore, to avoid memory leaks.
