---
title: Separation of concept and code
date: '2021-04-06T14:00:03.284Z'
---

This is post is a deep dive into one of the points of my last blog post.

Links for the previous post:

[https://varenya.dev/underappreciated-skills-of-dev/](https://varenya.dev/underappreciated-skills-of-dev/)

[https://dev.to/varenya/under-appreciated-skills-of-a-software-developer-39jn](https://dev.to/varenya/under-appreciated-skills-of-a-software-developer-39jn)

This sub-title from the previous post is :

***"Understand what the code does instead of what it looks like".***

In tech and esp in the JS world, there is a lot of FOMO around frameworks and new languages. The temptation to get on with the latest and popular stuff is strong and can get overwhelming at times. Especially for beginners.

Clickbaity articles like "Why Vue is better than React?", "Why Kotlin is the next big thing?" further adds to the problems. (These titles are samples)

Having been in the same boat and sometimes still do feel the temptation. I wanted to understand why over time this need has reduced and put into words so that others might feel at ease too.

The key to dealing with FOMO, I figured is to deep dive into a syntax (one level below the top-level API). Understand what the concepts involved are and how it's represented in code.

I have observed that there is usually an overlap between the underlying concepts. Not necessarily the syntax.

So how does this help?

- Learning curve reduces a lot.
- It's easier to become a polyglot.
- Reduces FOMO.

Lets take a few ***concepts*** to demonstrate what I mean: 

## Asynchronicity

Now within the JS ecosystem there are now multiple ways of achieving concurrency/async:  

### Using Callbacks

The code for it looks something like this:

```jsx
/* Example of a piece of code executing after a set time */

/* The first argument being the callback and second being delay in ms */

setTimeout(() => console.log('done!'), 1000)
```

I hope this is example communicates the use of callbacks. Here the concept we achieve is concurrency.

### Using Promises

Again, this is a fairly recent syntax introduced into the language which looks something like this:

```jsx
/* Converting the setTimeout function into a promise  */
const delay = (duration) =>  
        new Promise((resolve,reject) => setTimeout(resolve, duration));

/* Usage */

delay(1000).then(() => console.log('done'));

```

The above example achieves the same thing we did in the previous section using callbacks but the syntax has drastically changed.

### Using async/await

This is the latest way of achieving asynchronicity:

```jsx

await delay(1000);

console.log('hello');
```

Same thing as before i.e. same underlying ***concept*** but different ***syntax*** - do you get my drift? 

To gain deeper understanding of how the Async code is executed in JS, I highly recommend this talk:


<iframe width="560" height="315" src="https://www.youtube.com/embed/8aGhZQkoFbQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

And this concept of async can be extending to different languages too where the ***syntax*** is drastically different but the ***concept*** is same, some links to async syntax in different languages:

**using Java:**

[Async Await in Java - DZone Java](https://dzone.com/articles/async-await-in-java)

**using C#:**

[Asynchronous programming in C#](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/)

**using Kotlin:**

[https://kotlinlang.org/docs/async-programming.html#futures-promises-and-others](https://kotlinlang.org/docs/async-programming.html#futures-promises-and-others)

These are just some examples. I hope folks are able to see the parallels between the JS examples and other languages. 

Tldr: 

> grokking the underlying concept can help reduce the learning curve by a good margin

## Reactivity

This is specific to JS frameworks. 

To understand reactivity usually the best example is excel sheets. How so? 

Well, you can add value to a cell (lets call it **A**) and then add a formula based off that cell (lets call it **B)** and show the result in it. Everytime the value of **cell** **A** changes the value of **cell B** changes automatically based on the formula.

Why is it important? 

This is the core thing that all the frameworks try to achieve i.e. **syncing state with view**. 

### React:

In case of **React** it is achieved using the VDOM and reconciliation algorithm each time ***setState*** is called: 

```jsx
function DisplayCount() {
		const [count, setCount] = useState(0);
    return (
				<div>
							<h1> Count : {count} <h1>
							<button onClick={() => setCount(prevCount => prevCount + 1)}>
								Inc
							</button>
				</div>
    )

}
/* 
	Once setCount is called React triggers the reconciliation algorithm 
  and figures out what the changes are and updates the UI.
*/
```

### VueJS:

In case of **VueJS** it is achieved using property accessor's i.e. getters/setters. When ever a variable is accessed or changed Vue automatically triggers and UI update there by ***reacting*** to the changes.

```jsx
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
})

/* Usage */

/*
	So everytime message is updated you see the reversed string in the below. 
  Basically its reacting to the changes.
*/ 
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

For more info:

[https://vuejs.org/v2/guide/reactivity.html](https://vuejs.org/v2/guide/reactivity.html)

### Svelte:

Lets look at the code directly:

```jsx
<script>
	let count = 0;

	function handleClick() {
		 count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

For more info:

[https://svelte.dev/tutorial/basics](https://svelte.dev/tutorial/basics)

I hope my point is clear the above examples are drastically different in terms of their ***syntax*** but ***conceptually*** achieve similar things.

Some links to talk that have greatly helped me grok these concepts:

Talk by **Evan You** creator of **VueJS**:

<iframe width="560" height="315" src="https://www.youtube.com/embed/r4pNEdIt_l4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


Talk by **Rich Harris** creator of **Svelte**:

<iframe width="560" height="315" src="https://www.youtube.com/embed/AdNJ3fydeao" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


And FYI, there are different trade offs to the different API's/Syntax we just saw that I leave up the reader to go deeper into. I wrote another post in to help understand the different trade offs: 

[https://varenya.dev/api-design/](https://varenya.dev/api-design/)

[https://dev.to/varenya/core-principles-of-api-design-part-1-4g37](https://dev.to/varenya/core-principles-of-api-design-part-1-4g37)

I hope this helps, thanks for reading!