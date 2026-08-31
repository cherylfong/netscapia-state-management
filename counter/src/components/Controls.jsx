import { useCounterControls } from '../store'

const Controls = () => {

// The original unabated version:
//   const increment = useCounterStore(state => state.increment)
//   const decrement = useCounterStore(state => state.decrement)
//   const zero = useCounterStore(state => state.zero)

// Destructuring causes the Controls component to be re-rendered every time the counter value changes, even though the component only displays the buttons and not the value itself.
// const { increment, decrement, zero } = useCounterStore()

// Now no re-rendering occurs, since only the functions have been selected from the state, and they remain the same for the entire lifetime of the store.
const { increment, decrement, zero } = useCounterControls()

  return (
    <div>
      <button onClick={increment}>plus</button>
      <button onClick={decrement}>minus</button>
      <button onClick={zero}>zero</button>
    </div>
  )
}

export default Controls