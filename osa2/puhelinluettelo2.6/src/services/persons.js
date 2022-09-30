import axios from 'axios'
import { useState } from 'react'

const baseUrl = 'http://localhost:3001/persons'

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

  const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

export default { add, deleteName, getAll }