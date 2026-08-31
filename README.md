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
