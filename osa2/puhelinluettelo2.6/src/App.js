import { useState, useEffect } from 'react'
import Person from './components/Person'
import AddNew from './components/addNew'
import Filter from './components/filter'
import personService from './services/persons'
import './index.css'
import {Notification, Error} from './components/Notifications'

const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect(() => {
      personService.getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [errorMessage, setError] = useState(null)
  const [message, setMessage] = useState(null)

const addName = (event) => {
  event.preventDefault()
  const personObject = {name: newName, number: newNumber}

  //console.log(personObject)
  const personToEdit = persons.find(element => {return element['name'] === newName})

  if(personToEdit) {
    if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      //console.log(personToEdit)
      const changedNumber = {...personToEdit, number: newNumber}
      //console.log(changedNumber)

      personService.changeNumber(changedNumber).then(editPerson => {
        console.log(editPerson)
        setPersons(persons.map(person => person['name'] === personToEdit['name'] ? editPerson : person))
        setNewName('')
        setNewNumber('')
        setMessage(`${personToEdit.name} number changed`)
        setTimeout(() => {
        setMessage(null)
      }, 5000)
      })

      .catch(error => {
          setError(`Information of ${personToEdit.name} has already been removed from server`)
          setTimeout(() => {
            setError(null)
          }, 5000)
        })

  }
}

  else {
    personService.add(personObject).then(person => {
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')

      setMessage(`${personObject.name} added to Phonebook`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

}


const handleChange = (event) => {
   console.log(event.target.value)
  setNewName(event.target.value)
}
const handleChange2 = (event) => {
  console.log(event.target.value)
  setNewNumber(event.target.value)
}
const handleChange3 = (event) => {
  console.log(event.target.value)
  setFilter(event.target.value)
}

  return (

    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Error error={errorMessage} />

      <Filter 
        newFilter={newFilter} 
        handleChange3={handleChange3}
      />

      <h2>Add a new</h2>
      
      <AddNew 
        addName={addName}
        handleChange={handleChange}
        handleChange2={handleChange2}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>

      <Person 
        persons={persons.filter(element => element['name'].includes(newFilter))}
        setPersons={setPersons}
        setMessage={setMessage}
      />
      
    </div>
  )

}

export default App