import { useAnecdotesActions } from "../store"
import { useNotifyActions } from "../notificationStore"

const Anecdote = ({ anecdote }) => {
    const { vote, remove } = useAnecdotesActions()
    const { setNotify, clearNotify } = useNotifyActions()

    const voteHandler = () => {
        vote(anecdote.id)
        setNotify(`You voted '${anecdote.content}'`)
        clearNotify()
    }

    const deleteHander = () => {
        remove(anecdote.id)
        setNotify(`REMOVED ➡️ '${anecdote.content}'`)
        clearNotify()
    }
  
    return (
        <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={ voteHandler }>vote</button>
                <button onClick={deleteHander} 
                style={( anecdote.votes === 0 ? {display: "show"} :  {display: "none"})}>
                    DELETE</button>
            </div>
        </div>
    )
}

export default Anecdote