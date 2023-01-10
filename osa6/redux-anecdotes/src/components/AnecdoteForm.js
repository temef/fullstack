import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = {
      content: event.target.anecdote.value,
      string: "You added:"
    }
    console.log(content)
    event.target.anecdote.value = ''
    dispatch(newAnecdote(content.content))

    dispatch(createNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
        <h2>Create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote"/></div>
            <button type="submit">create</button>
        </form>
    </div>
  )
}

export default NewAnecdote