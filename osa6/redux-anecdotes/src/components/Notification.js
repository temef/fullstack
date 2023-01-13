import { connect } from 'react-redux'

const Notification = (props) => {
  
  const notifications = () => {
    // console.log(props)
    return props.notification.msg
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  if(!notifications()) return null
  return (
    <div style={style}>
      {notifications()}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectNotifications = connect(mapStateToProps)(Notification)
export default ConnectNotifications