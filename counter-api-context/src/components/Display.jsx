import useCounter from '../hooks/useCounter'

// The Display component no longer needs any props. 
// Gets the counter value by calling the useContext hook with the CounterContext object as its parameter.
const Display = () => {
  const { counter } = useCounter()

  return <div>{counter}</div>
}
export default Display