---
title: Under-Appreciated Skills of a Software Developer 
date: '2021-03-14T20:45:03.284Z'
tags: javascript,software-dev,api
published: false
---

This time I wanted to talk about certain skills I have noticed within myself and fellow devs that I think are crucial yet very much underappreciated. 

Lets go over them one by one:

## Empathy for legacy

Well, this seems obvious, doesn't it?

As a beginner, I used to have a knee-jerk reaction when exposed to a new codebase. I would judge it and think something along these lines:

- Why did they use this? ugh
- Why use this framework here?
- This looks overly complicated?

Do you get the drift? But the truth is it's very likely that if I had been in the place of the original devs who built it, I may not have done a better job.  The constraints of the time and place might have resulted in such a codebase (could be bad or good or somewhere in b/w).

Software development has a huge human component. That is often missed while reading/understanding code. Things like:

- Clients with budget and time constraints
- Devs with different preferences
- Teams with different perspectives on how to approach a problem
- Trade-off's b/w different tech stacks
- Tools used while building the project

And probably many more that goes into a software development project. 

tldr :

> Don't judge too quickly.

## Reading and Understanding Code

I spend most of my time reading and understanding code rather than actually writing it. 

And to be able to write it well, I need to be good at reading and understanding the codebase.  You might be wondering why?

Well, every codebase has a rhythm/style to it. And one must make sure to adhere to the style already present in the existing codebase. 

Lets take a look at an example:

```jsx
function createUser({ username, password }) {
  return {
    getUserName: function() {
      return username;
    },
    getPassword: function() {
      return password;
    },
  };
}
```

```jsx
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  getUserName() {
    return this.username;
  }
  getPassword() {
    return this.password;
  }
}
```

Both do similar goals with different trade-offs. The initial/lead developer might prefer either one of the above. We need to keep the big picture in mind and adhere to the style.

The difference in readability is massive if you don't.

tldr:

> Measure twice, cut once.

## Understand what the code does instead of what it looks like

A lot of the time in programming what you see is not what you get.  

A good example of this would be

```jsx
function User(username) {
	this.username = username;
}
```

If you are not familiar with JS one would assume this is a function declaration. When in reality this is how we used to define the `class` structure before ES6 syntax came along.

It looks like a function but actually is a constructor.  This kind of misdirection can come at the language level and also at the implementation level. One must be adept at understanding both.

tldr: 

> if it looks like a duck, doesn't mean it is a duck.

## Knowing when to act

It's very easy to get stuck in the analysis phase. Given that to solve a problem there are multiple ways with different trade-offs, it's very easy to fall into this trap.

I think this is where leadership kicks in - since somebody needs to decide on things and also take the blame for things when things will eventually go wrong! 

![https://media.giphy.com/media/Iy0Kg9oUBw9smEKWH8/giphy.gif](https://media.giphy.com/media/Iy0Kg9oUBw9smEKWH8/giphy.gif)

 

> “You can never know everything, and part of what you know is always wrong. Perhaps even the most important part. A portion of wisdom lies in knowing that. A portion of courage lies in going on anyway.”
—The Eye of the World, Robert Jordan

## Simplicity is hard

Chaos is the natural state of things.  If you consider all the things I mentioned earlier you can imagine just how much complexity can accrue over time and especially in software where the cost of making a change seems innocently less. 

What could wrong if we just add one more variable to this function? 

Ans:

![https://media.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif](https://media.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif)

So anything in your codebase that you are able to read, understand quickly and it just works? - It's boring, but it's the coolest thing you have just witnessed.


> “Simplicity is a great virtue but it requires hard work to achieve it and education to appreciate it. And to make matters worse: complexity sells better. - Edsger W. Dijkstra”

And whenever ***simplicity*** is mentioned in software I try and include this talk from **Rich Hickey**:

[Simple Made Easy](https://www.infoq.com/presentations/Simple-Made-Easy/)

## Care more about the artifact than the construct

This again I learned from **Rich Hickey** in the above talk.  There was a Twitter thread started by Mattias Peter:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">What do you think are critical traits in a programmer? NOT to be super 10x or anything - just to feel good and function well professionally.</p>&mdash; mpj 💛 (@mpjme) <a href="https://twitter.com/mpjme/status/855691565460848640?ref_src=twsrc%5Etfw">April 22, 2017</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I replied with this: 

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Who cares more about the artifact than the construct.</p>&mdash; Varenya (@varenya90) <a href="https://twitter.com/varenya90/status/855741548738338816?ref_src=twsrc%5Etfw">April 22, 2017</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

He chose my reply, to do a full video which I think does a better job than I ever could:


<iframe width="560" height="315" src="https://www.youtube.com/embed/mZNXkQxu9Rw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


Thanks for reading! I hope there are more folks who can relate to these. 

I always wonder how does one test for these qualities? - Food for thought 😀.