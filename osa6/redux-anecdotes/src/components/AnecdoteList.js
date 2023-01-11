import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdoteBackEnd } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const sortAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes).filter(anecdotes =>
    anecdotes.content.toLowerCase().includes(filter.text.toLowerCase()))
  
  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    const findRealAnecdote = anecdotes.find(n => n.id === anecdote.id)
    console.log('löytyykö', findRealAnecdote)
    dispatch(voteAnecdoteBackEnd(findRealAnecdote))

    const content = {
      content: anecdotes.find(n => n.id === anecdote.id).content,
      string: "You voted:"
    }
    
    dispatch(setNotification(content, 5))
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </div>
  )
}

export default Anecdotes