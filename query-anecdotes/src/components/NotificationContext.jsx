import { useEffect, createContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {
  const [notifyMessage, setNotifyMessage] = useState('')


  const setNotification = ( message, timeout) => {

    if(!timeout) timeout = 5000

    setNotifyMessage(message)

    setTimeout(() => { setNotifyMessage('') }, timeout)
  }
  
  return (
    <NotificationContext.Provider value={{ notifyMessage, setNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}