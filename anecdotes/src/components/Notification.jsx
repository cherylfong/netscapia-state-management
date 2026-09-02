import { useNotify } from "../notificationStore"


const Notification = () => {

  const notify = useNotify()

  

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  const disNone = {
    display: "none"
  }

  return (
    <div style={notify !== '' ? style : disNone} data-testid="notification">
      {notify}
    </div>
  )
}

export default Notification
