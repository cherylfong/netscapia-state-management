This is part 6 of the fullstack open course by <https://studies.cs.helsinki.fi>

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