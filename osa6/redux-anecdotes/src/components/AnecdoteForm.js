import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const NewAnecdote = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = {
      content: event.target.anecdote.value,
      string: "You added:"
    }
    console.log(content)
    event.target.anecdote.value = ''
    // const addAnecdote = await anecdoteService.newAnecdote(content.content)
    console.log("Form", props)
    props.newAnecdote(content.content)

    props.setNotification(content, 5)
    
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notifations: state.notifications,
  }
}

const mapDispatchToProps = {
  newAnecdote,
  setNotification,
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewAnecdote)

export default ConnectedAnecdotes