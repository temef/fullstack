import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }


// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
      voteAnecdote(state, action) {
        const changedAnecdote = action.payload
        return state.map(anecdote =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
        )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})


export const { appendAnecdote, setAnecdotes, voteAnecdote } = anecdoteSlice.actions

export const initalizeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const newAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.newAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdoteBackEnd = (object) => {
  // console.log("object:", object)
  return async (dispatch, asd) => {
    const changeVotes = {
      ...object,
      votes: object.votes + 1
      }
      // console.log(asd)
      const anecToChange = await anecdoteService.voteAnecdoteService(changeVotes)
      console.log(anecToChange)
    dispatch(voteAnecdote(anecToChange))
  }
}



export default anecdoteSlice.reducer