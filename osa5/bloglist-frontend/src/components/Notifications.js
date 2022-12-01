const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

const Error = ({ error }) => {
  if (error === null) {
    return null
  }

  return (
    <div id='error' className="error">
      {error}
    </div>
  )
}

export { Notification, Error }