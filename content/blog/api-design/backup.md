---
title: Elements of good API design
date: '2019-07-14T21:00:03.284Z'
tags: javascript
published: true
---

In this post I am going to try and list out what goes into making a good API.

There are no hard bound rules around this area and there is no single algorithm that will solve for every use case. But there are some guidelines that I have learned over the years which I would like to share.

Let's start off with defining what an API is in the first place:

It is a means through which a software interacts with another software.

A good metaphor to understand it is a Car, how so? Well think of how we "interact" with the Car -

1. Start the engine
2. Press the accelerator to move
3. Press break to stop/slow down.
   ...

Does this change if you change your Car model? No right. Thats because the API is same! So tomorrow even if I change my Car to an electric one I don't have to worry about learning how to drive it all over again! Which is huge a benefit which we take for granted everyday. So it gives you the ability to change everything under the hood without affecting it's users.

Now that we have gotten that out of the way lets get to the juicy parts:

There are two core parts in understanding what makes a API a good API :

Constraints and Heuristics

Let's see how and why.

The metaphor we are going to use to understand this is a game called `Tangram`.

It's a puzzle game where in you have 7 pieces of different shapes. Like this:

![tangram](https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Tangram_set_00.jpg/800px-Tangram_set_00.jpg?1563122396790)

And aim is to create other shapes from these 7 shapes. Like this:

![puzzle-example](https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Two_monks_tangram_paradox.svg/640px-Two_monks_tangram_paradox.svg.png?1563122758866)

According to wikipedia there have been 6500 puzzle's created till date, from just the 7 pieces!

So how does that help us in API design? - Well if you can figure out those "pieces" which give the user to ability to create more "shapes" you have essentially created a composable API.

So lets see what the `constraints` are in the case of `Tangram` :

1. You can only use 7 pieces
2. You only have a few shapes to use.

Now before we dive into the heuristics for `tangram` API design lets understand what heuristic means in the first place.

In short it means : "simple strategies to form judgements "
