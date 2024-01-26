import { useNotifyValue } from "../context/NotifycationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notifyValue = useNotifyValue()
  
  if (!notifyValue) return null

  return (
    <div style={style}>
      {notifyValue}
    </div>
  )
}

export default Notification
