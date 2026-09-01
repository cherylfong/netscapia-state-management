import { useAnecdotes } from "../store"
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()

  const descendingAnecdotesByVotes = anecdotes.toSorted((a, b) => b.votes - a.votes )

  return (
    <div>
      {descendingAnecdotesByVotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote}>
        </Anecdote>
      ))}

    </div>
  )
}

export default AnecdoteList
