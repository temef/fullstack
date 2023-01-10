import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)
  const sortAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
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