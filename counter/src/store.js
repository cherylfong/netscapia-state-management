import { create } from 'zustand'

// exports everything defined:
// export const useCounterStore = create(set => ({

const useCounterStore = create(set => ({
  counter: 0,
  actions: {
  increment: () => set(state => ({ counter: state.counter + 1 })),
  decrement: () => set(state => ({ counter: state.counter - 1 })),
  zero: () => set(() => ({ counter: 0 })),
  }
}))

// it is not advisable to export the function defining the entire state for use throughout the application

// expose specific functions and states, not everything

export const useCounter = () => useCounterStore(state => state.counter)

export const useCounterControls = () => useCounterStore(state => state.actions)