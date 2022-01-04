---
title: Functional JS
date: '2022-01-04'
---

There are few functional patterns that have become popular/semi-popular in JS world.

Javascript as a language is extremely malleable to different patterns/preferences and that can be a good thing and a bad thing.

The good thing is it can align with any of varied sensibilities in developer community. Bad thing is within a team, individuals with different preferences can write code completely different way within the same app which hurts readability considerably.

So I wanted to tackle this topic with regards to functional patterns which I am particularly familiar with and have experienced its pro's and con's in the JS world.

So let’s get started then.

## Point Free Pattern

This is basically a famous pattern in FP world where in you basically avoid passing function arguments when they basically pass through.

An example:

```jsx
function addOne(x) {
  return x + 1
}

/*  I want to add one to a array of integers */

/* Way One */

const resultOne = [1, 2, 3].map(function (x) {
  return addOne(x)
})

/* Way Two */

const resultTwo = [1, 2, 3].map(addOne)
```

Basically instead of explicitly calling the function and adding another layer of anonymous function we are using the function name itself and the arguments get passed implicitly.

So is this a good to have? My Take **No**.

Reason being its very easy to shoot your self in the foot with this pattern. Lets see how:

```jsx
/* convert string of numbers to integers using parseInt */

/* Using pointfree */

const pointFree = ['1', '2', '3'].map(parseInt)

/* Expected result : [1,2,3] *

/* Actual Result : [1,NaN,NaN] */
```

Why the **NaN's**? Well **parseInt** take's two arguments basically the string and the base to which it needs to convert to. And **map** actually sends in the current index along with current item in the list so the result is messed up.

So how to fix the above:

```jsx
const fixedWay = ['1', '2', '3'].map(function (x) {
  return parseInt(x, 10)
})
```

See explicit is better than implicit! you end up writing few more lines of code but you get the expected result.

## Pure Functions / Immutability

The idea is quite well known in the community. I won’t dig too deep here since it's been discussed/documented quite well now.

This is a great thing to simplify your code.

So my personal approach is:

1. To break down a particular functionality into pure functions.

2. Use immutable data structures to maintain state.

This approach works well with TDD. Makes code a lot more compositional to build other functionality in general.

But there are some nuances here that are worth discussing in the context of Javascript.

Javascript is a language that doesn’t enforce these rules at the language level. It's up to developers to make sure the rules are enforced. You can enforce it in the form of tests or other mechanisms but you cannot take it for granted.

The above fact has consequences. For example, some built-in functions in JS won’t adhere to those rules. A good example is the **_sort_** function and **_splice_** function which mutates the input you provide them. So when we are using them together with other parts of your software that is pure. The software as a whole won’t be pure anymore.

So you can run into subtle issues that can be hard to nail down and it's not just built-in JS functions that can cause this. It can be any piece of JS code - external libraries.

So should we give up on the idea? Well no - purism is good to have but trying to achieve perfection - not so much. Real life is rarely ever so pure 😉.

Local mutations are okay:

```jsx
/* Here both variables i and total are */
function sum(array) {
  let total = 0
  for (let i = 0; i < array.length; i++) {
    total += array[i]
  }
  return total
}
```

Keep your state mutations in a single place to so that you can easily know where to look when something breaks:

```jsx
/* Pure functions */
function increment(currentCount) {
  return currentCount + 1
}

function decrement(currentCount) {
  return currentCount - 1
}

/* impure functions with state updates and mutations */

function updateCount(initialCount = 0) {
  let currentCount = initialCount
  return {
    updater(updateFn) {
      currentCount = updateFn(currentCount)
    },
    getCount() {
      return currentCount
    },
  }
}

// Usage

const counterMethods = updateCount(10)

counterMethods.updater(increment)

counterMethods.getCount() // 11

counterMethods.updater(decrement)

counterMethods.getCount() // 10
```

If the above feels familiar then your right - its basically what **_Redux_** does!

Before I wrap this section up its important to know that immutability and pure functions can be costly when it comes to performance. If you are building a performance sensitive application updating objects through spread operator can be costly operation and can be source of problem.

But in my experience those instances have been rare. This is good advice to follow in general:

> make it work, make it right, make it fast - Kent Beck

## Reduce the use of reduce

Although **_reduce_** is quite a handy higher order function and very flexible it can be taken to an extreme.

A good example:

```jsx
function getProp(obj, path) {
  return path.reduce((acc, pathItem) => {
    if (typeof acc === 'string') {
      return acc
    }
    if (acc.hasOwnProperty(pathItem)) {
      return acc[pathItem]
    }
    return 'Path not found'
  }, obj)
}

getProp({ person: { firstName: 'test' } }, ['person', 'firstName']) // returns "test"
```

Here we are having to go through all the items on the list even if the path is not present early on. This could be avoided if we use a simple for loop:

```jsx
function getProp(obj, path) {
  let currentObj = obj
  for (let pathItem of path) {
    if (currentObj.hasOwnProperty(pathItem)) {
      currentObj = currentObj[pathItem]
    } else {
      return 'path not found'
    }
  }
  return currentObj || 'path not found'
}
```

The thing about **_reduce_** compared to **_map_** and **_filter_** is that **_reduce_** is lot more flexible than the others. So it’s tempting to use it in places where it may not really be a good fit.

This is a blurry line and takes some experience and intuition to say when one is good and when one is bad.

## Function Composition/Pipe

Here the idea is that we can send a piece of data through series of operations and modify the data in someway to get a desired result.

This too is very good pattern in general but comes with a few drawbacks in the context of JS:

1. If any of the operations are having side effects or mutations this can cause really hard to find issues.
2. Debugging can be tricky if you are composing multiple functions together - determine where something went wrong can be hard.
3. Order of arguments is important and can be easily missed which can be a source of confusion.

There is a proposal currently in stage-2 to make this built into JS - the syntax looks like this:

```jsx
const num = 5;
const double = num => num * 2;
const addOne = num => num + 1;
const num
				|> double
				|> addOne // output 11
```

This is very concise and cool thing to have. The above mentioned drawbacks can be avoided by using few constraints:

1. Always use small pure functions to pipe through.
2. In general keep the number of operations at 1-4 to avoid troubles.
3. Each function should take at most 1-2 arguments.

## Conclusion

The goal here is to strike a balance between functional patterns and JS primitives.

Some other takeaways from my experience:

- If there is a use case where mutating a variable is simplifying your code - go for it. Instead of coming up with a convoluted way of doing the same thing for the sake of purity.
- When it comes to asynchrony separate the effect part from the processing part. Imperative shell and functional core.
- Some libraries make some of the patterns I mentioned earlier turn bad into good. A good example is Ramda: [https://ramdajs.com/](https://ramdajs.com/). It’s built on point-free, currying, composition principles.
- Don’t go for fancy Dependency Injection frameworks. Good old higher-order functions are then good enough to get the job done.

Thats it. Thanks for reading.
