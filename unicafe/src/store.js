import { create } from 'zustand'

const calculateDerivedValues = ({ good, neutral, bad, all }) => {
  const total = good + neutral + bad

  return {
    all: total,
    average: total === 0 ? 0 : (good - bad) / total,
    positive: total === 0 ? 0 : (good / total) * 100,
  }
}

const useUnicafeStore = create(set => ({
  variables: {
    all: 0,
    good: 0,
    neutral: 0,
    bad: 0,
    average: 0,
    positive: 0,
  },
  actions: {
    good: () =>
      set(state => {
        const nextGood = state.variables.good + 1
        const nextValues = {
          ...state.variables,
          good: nextGood,
          ...calculateDerivedValues({
            ...state.variables,
            good: nextGood,
          }),
        }

        return { variables: nextValues }
      }),
    neutral: () =>
      set(state => {
        const nextNeutral = state.variables.neutral + 1
        const nextValues = {
          ...state.variables,
          neutral: nextNeutral,
          ...calculateDerivedValues({
            ...state.variables,
            neutral: nextNeutral,
          }),
        }

        return { variables: nextValues }
      }),
    bad: () =>
      set(state => {
        const nextBad = state.variables.bad + 1
        const nextValues = {
          ...state.variables,
          bad: nextBad,
          ...calculateDerivedValues({
            ...state.variables,
            bad: nextBad,
          }),
        }

        return { variables: nextValues }
      }),
    all: () =>
      set(state => {
        const nextValues = {
          ...state.variables,
          ...calculateDerivedValues(state.variables),
        }

        return { variables: nextValues }
      }),
    average: () =>
      set(state => {
        const nextValues = {
          ...state.variables,
          ...calculateDerivedValues(state.variables),
        }

        return { variables: nextValues }
      }),
    positive: () =>
      set(state => {
        const nextValues = {
          ...state.variables,
          ...calculateDerivedValues(state.variables),
        }

        return { variables: nextValues }
      }),
  },
}))

export const useUnicafeVariables = () => useUnicafeStore(state => state.variables)

export const useUnicafeControls = () => useUnicafeStore(state => state.actions)