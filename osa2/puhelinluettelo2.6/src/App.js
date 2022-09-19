import { useState } from 'react'
import Person from './components/Person'
import AddNew from './components/addNew'
import Filter from './components/filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

const addName = (event) => {
  event.preventDefault()
  const personObject = {name: newName, number: newNumber}
  if(persons.some(element => element['name'] === newName)) alert(`${newName} is already added to phonebook`)
  else {
  setPersons(persons.concat(personObject))
  setNewName('')
  setNewNumber('')
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

      <Person persons={persons.filter(element => element['name'].includes(newFilter))}/>
      
    </div>
  )

}

export default App
