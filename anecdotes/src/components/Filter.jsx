import { useAnecdotesActions } from '../store'

const Filter = () => {

   const { setFilter } = useAnecdotesActions()
    
  const handleChange = (event) => {
    const inputValue = event.target.value
    setFilter(inputValue)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input data-testid='filter' name='filter' onChange={handleChange} />
    </div>
  )
}

export default Filter