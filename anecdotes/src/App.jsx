import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useAnecdotesActions } from './store'

const App = () => {

  const { initialize } = useAnecdotesActions()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <Notification/>
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}


export default App
