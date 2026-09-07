import useNotify from "../hooks/useNotify"


const Notification = () => {

  const { notifyMessage } = useNotify()

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  const disNone = {
    display: "none"
  }

  return <div data-testid="notification" style={notifyMessage !== '' ? style : disNone}>{notifyMessage}</div>
}

export default Notification
