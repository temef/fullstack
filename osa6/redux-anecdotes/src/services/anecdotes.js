import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const newAnecdote = async (content) => {
    const anecdote = { content, votes: 0}
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const voteAnecdoteService = async (content) => {
    console.log("mikä tää on", content)
    const anecdote = await axios.put(`${baseUrl}/${content.id}`, content)
    return anecdote.data
}

const exportObject = { getAll, newAnecdote, voteAnecdoteService }

export default exportObject