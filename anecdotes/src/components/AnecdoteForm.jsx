import { useAnecdotesActions } from '../store'

const AnecdoteForm = () => {
const {add} = useAnecdotesActions()

 
  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.content.value
    await add(content)
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
