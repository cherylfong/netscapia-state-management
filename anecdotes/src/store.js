import { create } from 'zustand'
import anecdoteService from './services/anecdote'

export const getId = () => (100000 * Math.random()).toFixed(0)

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    },
    add: async (content) => {
      const anecdote = await anecdoteService.createNew(content)
      set(state => ({ anecdotes: [...state.anecdotes, anecdote] }))
    },
    vote: async (id) => {
      const anecdote = get().anecdotes.find(n => n.id === id)
      const updated = await anecdoteService.update(
        id, { ...anecdote, votes: anecdote.votes + 1 }
      )
      set(state => ({
          anecdotes: state.anecdotes.map(a => a.id === id ?updated : a)
        }))
    },
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
