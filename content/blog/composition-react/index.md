---
title: Composition and React
date: '2019-04-24T18:17:03.284Z'
---

So lets start of with the first item in the title of this topic i.e. **Composition**.

##What is it and why is it important?

It means putting different things together to create something bigger than the individual pieces. A good example of composition are the languages themselves, no not programming languages but our own languages.

How so?

_letters_ put together form _words_  
_words_ put together form _sentences_  
_sentences_ put together form a _paragraph_..

You get my drift? Just replace **`put`** with **`compose`** and you will get what I am getting at. Can we just randomly put together words to create sentences? No there are rules governing what makes a sentence i.e. grammar.

So lets try and define the term in the context of programming. So the general idea is basically taking one type of thing and combine them to create other type of things.

In programming lanugages we have primitives like integers, strings, functions, objects and we combine them to produce software instead of letters, words, sentences.

So what is the corollary for grammar or rules in case of programming languages? well at the most basic level its nothing but `syntax` which compilers enforce unless you follow the `syntax` you will not get working software similar to how if we don't follow grammar you won't get a proper book.

Okay fair enough but how's it important? Well because as humans there is only so much information one can keep in their heads so we need come up with different ways to logically group things and combine them so that we can build stuff more reliably.

So are there rules for composing software? I mentioned `syntax` earlier but thats barely enough to guide us to create compositional software. We don't have rules no, but we do have best pracitces/design patterns (which compilers can't enforce) which have been discovered by folks who have been doing this for a lot longer than I have, but they are more of guidelines instead of hardbound rules and can be misused lot of times and requires experience/intuition to know which `pattern` or `best pracitce` to use in which context otherwise can lead to bad results.

Examples of design patterns:

- Factory Pattern
- Facade Pattern
- Recursion
- Dependency Injection
- ...

Turns out mathematicians are really great at figuring out patterns and laws out of primitives and there is an awesome amount research surrounding it, which are proved laws which can be enforced by a compiler! Alas thats a bigger topic (another blog post may be?) and we need to move on to `React`!

##Composition in React

I think that the best programmers of today are really good at composition i.e. they are able to figure out what the right primitives are around a domain and come up with really good ways to compose them to create readable/maintainable software, this I have realized is an acquired skill. `React` is no exception this!

Before we talk about composition in React lets list out the primitives in React:

- Perhaps the most important one and the most basic unit : `Component`
- Context
- The Lifecyle methods
- State and Props
- Suspense
- Refs
- Hooks!
- Since we write React in good old JS you have at your disposal all that the language provides i.e. loops, arrays, stacks, generators etc etc.

So as a `React` dev our job is basically to use the above in the best way possible to create an app!

The most basic units of composition in React are `Component` and the new kid on the block `Hooks`.

Lets look at some basic examples of composition in React.

### Title component:

```javascript
const Title = props => <h1>{props.title}</h1>
```

### Description component:

```jsx
const Description = props => <p>{props.description}</p>
```

We can combine the above two to create a new component:

```jsx
const Card = props => (
  <Fragment>
    <Title title={props.title} />
    <Description description={props.description} />
  </Fragment>
)

// Usage

<Card title="Composition" description="jibber jabber" />
```

I think the above is pretty straight forward way we use React day to day and is a basic example of composition in React.

Now the main part of blog:

## Effective Composition in React

I will do this in a before/after kind of pattern i.e. I will show one way of doing things and show why its bad and show a better way of achieving the same thing:

## The Simple Button :

```jsx
  function BadButton(props) {
    if (props.primary) {
      return <button className={`btn btn-primary`}>{props.children}</button>;
    }

    if (props.secondary) {
      return <button className={`btn btn-secondary`}>{props.children}</button>;
    }

    return null;
}
```

The above component which seems fairly simple and innocent can get bad very quickly, lets see how it could be used in practice: 

```jsx
    <BadButton primary /> // gives a primary button
    <BadButton secondary /> // gives a secondary button
    <BadButton primary secondary /> // gives what???
```

See what I mean, here the root cause is due to the fact that we are modelling type of a button as a boolean and that quickly led to a invalid state. 

No worries we can do better by doing this:

```jsx
  function GoodButton(props) {
  if (props.buttonType === "primary") {
    return <button className={`btn btn-primary`}>{props.children}</button>;
  }
  if (props.buttonType === "secondary") {
    return <button className={`btn btn-secondary`}>{props.children}</button>;
  }

  return null;
}

GoodButton.propTypes = {
  buttonType: PropTypes.oneOf(["primary", "secondary"])
};
```
See? Just changing it to a simple enum removed that invalid state altogether (JavaScript doesn't have enums but by using string and prop-types we can emulate it)

Lets take it a step forward using the above component :

```jsx
  function PrimaryButton(props) {
    const { buttonType, ...rest } = props;
    return <GoodButton buttonType="primary" {...rest} />;
  }

 function SecondaryButton(props) {
    const { buttonType, ...rest } = props;
    return <GoodButton buttonType="secondary" {...rest} />;
 }
```

See what I did there used props to create new components! So what is so great about this? It hides away the implementation details of how `PrimaryButton` is created and the consumers don't have to worry about which props to pass to make it a `PrimaryButton` in the first place. 

Say tomorrow your designer comes in and says that the `PrimaryButton` needs to have itallic text you can just go ahead add modify the code like this:


```jsx
  function PrimaryButton(props) {
    const { buttonType, ...rest } = props;
    return <GoodButton buttonType="primary" textStyle="itallic" {...rest} />;
  }
```
Thats it, the conumsers don't have to change anything!

Here's the codesanbox link with the full code:

<iframe src="https://codesandbox.io/embed/w73y3kq93l?fontsize=14" title="Composition" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Lets look at another non trivial example and with some other primitives.

## A DropDown Component

Now usually a component like this is implemented in a idiomatic way where in we expect the shape of the input in a certain fashion and we pass it to the component which renders the required component with behaviour encapsulated within it.

Something like this:

```jsx
function DropDown(props) {
  const [selectedItem, handleSelectedItem] = useState(props.initialValue);
  return (
    <select value={selectedItem} onChange={(e) => handleSelectedItem(e.target.value)}>
      {props.options.map(eachOption => (
        <option value={eachOption.value}>{eachOption.label}</option>
      ))}
    </select>
  )
}
```

So the component expects two props i.e. an `initialValue` and second a list options which looks something like this:

```jsx
  const options = [
      {option: 'One', value '1'},
      {option: 'Two', value '2'}
  ]
  // Usage
  <DropDown initialValue="1" options={options} />
```

For most basic use cases this works fine but it quickly becomes hard to adapt it to different requirements:

  1. We are constraining the `options` to be passed in a particular fashion which puts a constraint on the consumers to adapt all their data to this structure which is additional thing which one must do.
  2. Lets say we want the third option to be disabled what do we do? Add another prop which takes the index or an `id`, fine but lets say you want to add search bar to filter through your options another prop? or if we now want to add ability to select multiple options - the component becomes increasingly complex and bug prone.
  3. What to do if we want to render the options in someother place other than at the bottom?
  4. In a particular scenario I want the options to be displayed in a reverse fashion or sorted by some logic! 

See how things grow and if we do it the usual way of adding more and more props we end up introducing loads of complexity and likely introduce lots of bugs.

## Composition to the rescue!

Lets refactor the above to be a bit more compositional. First off lets break down the pieces an create a components out of it:

```jsx

function DropDown(props) {
  const [selectedItem, handleSelectedItem] = useState(props.initialValue)
  return <select>{props.children}</select>
}

function Option(props) {
  const { value , label, ...rest } = props;
  return <option value={value} {...rest}>{label}</option>
}

```
I know that the above implementation won't work yet, but this is the API I would be aiming for. Right out of the box this solves most problems i.e. if you want to disable a particular option the consumer would just have to pass a disabled flag to the component and thats it! and if you think about it it's the `Option` component which should be aware of that piece of information not the parent `DropDown` component. And it doesn't set any constraints on the consumer as to how the options structure needs to be it can be anything!

Also if you want to add search based on some term we don't need to do anything consumers can implement it fairly easily since its now composable :

```jsx

<DropDown>
   {options
      .filter(option === option.label.indexOf(searchTerm)!== -1)
      .map(option => <Option {...option}/>)}
</DropDown>

```

Thats it! I hope its clear how composition reduces complexity? It does it by basically giving the consumers the pieces and letting them put it together in the fashion they need and while taking care of the core piece of logic i.e. in this case selecting an item in the dropdown. The fancy terminology used for this is called `inversion of control`.

We now know the API we need to go for, lets fill in the pieces we need to get this working as we want. So far we have used the `Hooks`  primtive and of course the `Component` now we will use `Context` to connect the now separate `DropDown` and `Option` components.


```jsx

const DropDownContext = React.createContext('')

function DropDown(props) {
  const [selectedItem, handleSelectedItem] = useState(props.initialValue)
  return (
    <ul className="custom_dropdown">
      <DropDownContext.Provider value={{ selectedItem, handleSelectedItem }}>
        {props.children}
      </DropDownContext.Provider>
    </ul>
  )
}

function Option(props) {
  const { selectedItem, handleSelectedItem } = useContext(DropDownContext)
  return (
    <li
      className="custom_dropdown_item"
      selected={selectedItem === value}
      onClick={() => handleSelectedItem(value)}
      value={props.value}
    >
      {option.label}
    </li>
  )
}

```

Now this should work! Notice I have changed the native `select` to `ul` and `li` which doesn't matter any more because the consumer would only see `DropDown` and an `Option` how its implemented is not their concern!

And the great benefit of using `Context` is you are not constrainted by where it needs to be renedered the logic would still work i.e. as long you are a descendand of the provider, so in theory you could do something like this:


```jsx
<DropDown>
  <Modal>
    <Option value={1} label="One"></Option>
    <Option value={2} label="Two"></Option>
    <Option value={3} label="Three"></Option>
  </Modal>
</DropDown>
```

Thats it, here I have assumed I have a `Modal` component which renders the children in a modal pop up and by combining `DropDown` , `Modal` , `Option` we have created a new component which renders the options inside a modal! without needing to much additional work at all.

Now imagine doing the above in the first implementation :-), it would have added loads of complexity and probably only for few cases where this kind of behaviour is needed.

The essence of all this is that when creating any component we cannot predict the number of ways it can be used and optimizing for composition helps in not having to worry about that as much as possible since we give the pieces and consumers use them as they want without having to worry about the core mechanics of it in this case selecting a item and leaving it to the consumers where and how they want to render it as we just demonstrated.

 This is what makes composition such a useful proposition and which ever framework/library designs their API's keeping this in my mind will stay for long is what I believe (Obviously while giving decent performance!).

And the `Hooks` api is just another step in that direction which gives us lot more primitives to compose with and my mental models around it have not been developed yet to a point to create such effective compositions, probably after I use it a while I will come up with something or the community will (probably the latter!)

All of this is not my own thinking its something derived from talks/blogs and other materials shared by the awesome folks in the community. So here are some references:

[Ryan's Talk on Compound Components](https://www.youtube.com/watch?v=hEGg-3pIHlE)  
[Kent C Dodd's talk title 'Simply React'](https://www.youtube.com/watch?v=AiJ8tRRH0f8)  
[Fun with React Hooks](https://www.youtube.com/watch?v=1jWS7cCuUXw&t=1426s)


Codesandbox for the full working implementation of the DropDown component:


<iframe src="https://codesandbox.io/embed/github/varenya/select/tree/master/?fontsize=14" title="select" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>



I hope this was helpful, thanks for reading!


