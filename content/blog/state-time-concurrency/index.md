---
title: State, Time and Concurrrency
date: '2021-04-12'
published: false
description:
tags: javascript,webdev,state,concurrency
---

**_State, time, and concurrency_** are critical to building scalable software. Yet I had very little context over what they were and how they relate with each other when I started.

So this is the post that I would have wanted when I started.

## State and Time

First, let's understand what **_state_** is.

> It's a piece of data that changes over **_time._**

Some examples of state in programming:

- Current time
- Location of a character in a game.
- Bank Balance
- No of. employees at an org
- ....

I hope you get the drift?

Now you might be wondering how they are related? Well, if you read the definition it's right there **_"changes over time"_**.

Lets take a code sample:

```jsx
let balance = 4 /* State */

function incBalance(amt) {
  balance += amt
}

incBalance(4) /* Output 8 */
incBalance(4) /* Output 12 */
```

Here the variable **_balance_** is a piece of **state** which is updated by the function **incBalance**.

I called the function **_incBalance_** twice and each time the output was different. Let's look at how the execution went down:

The first time it was run:

```jsx
incBalance(4)

/* let's execute the function by 
replacing the argument amt with the value i.e. 4*/

balance += 4

/* the current value of variable balance is 4, so the result is */

balance = 8
```

The second time it was run:

```jsx
incBalance(4)

/* let's execute the function by 
replacing the argument amt with the value i.e. 4*/

balance += 4

/* the current value of variable balance is 8, so the result is */

balance = 12
```

So the function **_incBalance_** was updating a piece of state called **_balance_** and each time it was run, the output was dependent on the **_past_** value.

Another way of looking at this is whenever there is a stateful function (a function dependent on a piece of state) the output is not just dependent on the inputs but also **_when_** the function is run. In other terms, it is dependent on **_time_**.

> A function that doesn't depend on the state is called a "pure" function.

### TLDR:

> When we introduce **state** we introduce dependency on **_time_**.

## Time and Concurrency

Definition of concurrency from a popular StackOverflow [answer](https://stackoverflow.com/questions/1050222/what-is-the-difference-between-concurrency-and-parallelism):

> Concurrency is when two or more tasks can start, run, and complete in overlapping **_time_** periods

Again from the definition itself, we can see **_"overlapping time periods"._**

Let's look at some code again:

```jsx
let balance = 10

function incBalance(amt) {
  balance += amt
}

setTimeout(() => incBalance(8), 1000 * 3)
setTimeout(() => incBalance(8), 1000 * 1)
setTimeout(() => incBalance(8), 1000 * 2)

console.log({ balance }) /* Output 10 */
```

When you execute the above the output should be the value 10, which should be confusing?

In the above code sample, we are trying to achieve concurrency by using the **_setTimeout_** function. Basically, **_incBalance_** will be called **_concurrently_** three times at different time intervals so when all of them are done the final **balance** value should be **34** instead of **10.**

**So what is going on here and how do we get the expected result?**

We need to ensure that all the concurrent calls are executed before we print the result.

**How do we keep track of the fact whether all that needs executing is executed?**

By using - **State**!

Let's update the above code and include some **state** to make sure all the **concurrent** stuff is completed at a given **time**:

```jsx
let balance = 10

/* state */
let task_completed = {
  task1: false,
  task2: false,
  task3: false,
}

function incBalance(amt) {
  balance += amt
}

function concurrentIncBalance(taskName) {
  incBalance(8)
  task_completed[taskName] = true
  /* time */
  if (
    task_completed['task1'] &&
    task_completed['task2'] &&
    task_completed['task3']
  ) {
    console.log('Finished running all three tasks and the result is:')
    console.log({ balance })
  }
}

/* concurrency */
setTimeout(() => concurrentIncBalance('task1'), 1000)
setTimeout(() => concurrentIncBalance('task2'), 1000)
setTimeout(() => concurrentIncBalance('task3'), 1000)
```

Phew! See just adding a few requirements can make the code so much more complex!

> The above **callback** based approach is a good segue to learning about **Promises.**

I hope this helps, thanks for reading.
