import { create } from 'zustand'
import anecdoteService from './services/anecdote'

export const getId = () => (100000 * Math.random()).toFixed(0)

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      console.log('HUH??')
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    },
    add: anecdote => set(
      state => ({ anecdotes: [...state.anecdotes, anecdote] })
    ),
    vote: id => set(
      state => ({
        anecdotes: state.anecdotes.map(a => a.id === id ? {
          ...a, votes: a.votes + 1
        } : a)
      })),
    setFilter: value => set(() => ({ filter: value }))
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  return anecdotes.filter(a => a.content.includes(filter))
}

export const useAnecdotesActions = () => useAnecdoteStore((state) => state.actions)

export const useFilter = () => useAnecdoteStore((state) => state.filter)
