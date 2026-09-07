This is part 6 of the fullstack open course by <https://studies.cs.helsinki.fi>

### Github Actions Test Status

<details>
<summary>part6-a</summary>

[![Unicafe tests](https://github.com/cherylfong/netscapia-state-management/actions/workflows/unicafe-tests.yml/badge.svg)](https://github.com/cherylfong/netscapia-state-management/actions/workflows/unicafe-tests.yml)

</details>

<details>
<summary>part6-d</summary>

[![Anecdotes tests](https://github.com/cherylfong/netscapia-state-management/actions/workflows/anecdotes-tests.yml/badge.svg)](https://github.com/cherylfong/netscapia-state-management/actions/workflows/anecdotes-tests.yml)

[![Anecdotes tests check](https://github.com/cherylfong/netscapia-state-management/actions/workflows/anecdotes-test-tests.yml/badge.svg)](https://github.com/cherylfong/netscapia-state-management/actions/workflows/anecdotes-test-tests.yml)

</details>

<details>
<summary>part6-c</summary>

[![Query anecdotes tests 1](https://github.com/cherylfong/netscapia-state-management/actions/workflows/query-anecdotes-tests1.yml/badge.svg)](https://github.com/cherylfong/netscapia-state-management/actions/workflows/query-anecdotes-tests1.yml)

[![Query anecdotes tests 2](https://github.com/cherylfong/netscapia-state-management/actions/workflows/query-anecdotes-tests2.yml/badge.svg?branch=part6-c)](https://github.com/cherylfong/netscapia-state-management/actions/workflows/query-anecdotes-tests2.yml)
</details>

### Part 6 sub a. | Flux-architecture and Zustand

Prior to Part 6, React's useState was the primary method for state management.

The state of React components and functions were typically defined in the root component and then passed through props to components that needed them.

However, as the size and complexity of the application grows, state management becomes more challenging.

#### Zustand

Installation:

`npm install zustand`

Zustand-related functions are named starting with the word `use`. T

The function returned by Zustand's create function e.g. `useCounterStore()` is a React custom hook function.

The helper functions `useCounter()` and `useCounterControls()` are also custom hooks because provide excess to member fields and functions within a custom hook function.

[Custom hooks are expected to always start with the word `use`.](https://react.dev/warnings/invalid-hook-call-warning)

Zustand's [documentation](https://zustand.docs.pmnd.rs/learn/guides/immutable-state-and-merging) should update states immutably. The proper way is to use a function such as `concat()` or [spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) syntax that does not modify the existing state.

States created with Zustand is [immutable](https://developer.mozilla.org/en-US/docs/Glossary/Immutable), and the action functions that modify the state must be [pure functions](https://en.wikipedia.org/wiki/Pure_function).

Pure functions produce no side effects and always return the same result when called with the same parameters.

[Best practice](https://tkdodo.eu/blog/working-with-zustand#keep-the-scope-of-your-store-small) indicates that unrelated functions and objects should have their own store.

[`useShallow()`](https://zustand.docs.pmnd.rs/reference/hooks/use-shallow) can [prevent unnecessary re-rendering](https://fullstackopen.com/en/part6/complex_state_fetch_testing#:~:text=A%20possible%20alternative%20solution) e.g.(new object creation) by using shallow copies that do not take references into account.

#### Uncontrolled Form

A form that does not have its field's value bounded to the state of the App component is known as a [uncontrolled](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components) form.

Some limitations to [uncontrolled forms](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/) are:

- It cannot provide validation messages.
- It cannot disable the submit button based on content.

#### Middleware

**A way to log the state of a Zustand store** using a wrapper known as a middleware.

```javascript
const logger = (config) => (set, get) => config(
  (...args) => {
    console.log('prev state', get());
    set(...args);
    console.log('next state', get());
  },
  get
);
```

For example, `logger` can be wrapped around a store:

```javascript
const useNoteStore = create(logger((set, get) => ({
  notes: [],
  filter: '',
  actions: {
    // ...
  }

})))
```

Or by using **Zustand middleware devtool**:

```javascript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'


const useNoteStore = create(devtools((set, get) => ({
  notes: [],
  filter: '',
  actions: {
    // ...
  }

})))
```

Using Zustand's ready-made devtools middleware allows integrating the store with the browser's devtool extension such as [Redux Devtool](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).

#### TanStack Query

Installation: `npm install @tanstack/react-query`

Benefits of using [TanStack Query](https://tanstack.com/query/latest):

> Data can be retrieved the server and rendered to the screen without using React hooks `useState` and `useEffect` from in chapters 2-5. The data on the server is can be entirely under the administration of the TanStack Query library.
>
> Simplifies data processing from server and can eliminate the need for data from the server to be saved in the frontend state.

##### TanStack vs Zustand

TanStack Query is a **server-state** library, responsible for managing asynchronous operations between your server and client.

Zustand is a **client-state** library that can be used to store asynchronous data, albeit inefficiently when compared to a tool like TanStack Query.

#### Context API

React's built-in [Context API](https://react.dev/learn/passing-data-deeply-with-context) offers a solution to [prop-drilling](https://kentcdodds.com/blog/prop-drilling) which is having to pass props from the app down to each nested component to the actual component that needs the prop.

A simple implementation can be done by using `createContext()`, `CounterContext.Provider`, and `useContext()`.

#### Deciding Which State Management to Use

React's `useState` and `useEffect` hook are good enough for simple applications and is a good enough staring point. However, is prone to _prop drilling_ as the application grows with more components. Using React's Context library can help alleviate this issue.

Using more than one state management library is sometimes necessary, the approach is to use whatever is best suited for the objective and appropriate within a timeframe for completion. But also remember and be willing to pivot to a different library when the objective changes or when the particular library is no longer suitable with the code structure.

The difficulty is knowing how to leverage the pros and cons of each state management library depending on the use case.
