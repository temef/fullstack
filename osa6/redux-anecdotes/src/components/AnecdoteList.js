import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const sortAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes).filter(anecdotes =>
    anecdotes.content.includes(filter.text))
  console.log(filter)
  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    const content = {
      content: anecdotes.find(n => n.id === id).content,
      string: "You voted:"
    }
    dispatch(createNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return(
    <div>
      {sortAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>
  )
}

export default Anecdotes