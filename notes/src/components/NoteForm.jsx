import { useNoteActions } from '../store'

// const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const NoteForm = () => {
    const { add } = useNoteActions()

    const addNote = async (e) => {
        e.preventDefault()
        const content = e.target.note.value
        // gets back an object describing the note, the backend generates an id
        await add(content)
        add(newNote)
        e.target.reset()
    }

    return (

        <>
            <form onSubmit={addNote}>
                <input name="note" />
                <button type="submit">add</button>
            </form>
        </>
    )
}

export default NoteForm