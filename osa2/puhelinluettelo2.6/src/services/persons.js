import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const add = object => {
    const request = axios.post(baseUrl, object)
    return request.then(response => response.data)
}

const deleteName = (object) => {
    if(window.confirm(`Delete ${object.name}?`)) {
    const request = axios.delete(`${baseUrl}/${object.id}`)
    return request.then(response => response.data)
    }
  }

  const changeNumber = (object) => {
    const request = axios.put(`${baseUrl}/${object.id}`, object)
    return request.then(response => response.data)
  }

const exportObject = { add, deleteName, changeNumber, getAll }

export default exportObject