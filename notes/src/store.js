import { create } from 'zustand'

const useNoteStore = create(set => ({
  notes: [],
  actions: {
    // an array is formed by spreading each element of the state.notes array using spread syntax, and then appending the new note at the end
    add: note => set(
      state => ({ notes:[...state.notes, note] })
    ),
    toggleImportance: id => set(
      state => ({
        notes: state.notes.map(note =>
          note.id === id ? { ...note, important: !note.important } : note
        )
      })
    )
  }
}))

export const useNotes = () => useNoteStore(state => state.notes)
export const useNoteActions = () => useNoteStore(state => state.actions)