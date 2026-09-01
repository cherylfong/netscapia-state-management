import { useAnecdotesActions, getId } from '../store'

const AnecdoteForm = () => {
const {add} = useAnecdotesActions()

 
  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.content.value
    add(
       { id: getId(), content, votes: 0})
    e.target.reset()

  }

  return (
    <div>
      <form onSubmit={addAnecdote}>
        <div>
          <input data-testid="new" name="content"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
