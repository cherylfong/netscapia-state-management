import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'


const App = () => {

  return (
    <>
    <h1>NOTES</h1>
      <div>
        <NoteForm />
        <NoteList />
      </div>
    </>


  )
}

export default App