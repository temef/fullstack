import personService from '../services/persons'

const Person = ({ persons, setPersons, setMessage }) => {
    return (
        <>
            {persons.map(person =>
            <div key={person.name} className='person'>
            <b> {person.name} {person.number} <button onClick={() => 
                {if(personService.deleteName(person)) {
                    setPersons((persons) => persons.filter((p) => p.name !== person.name))
                    setMessage(`Deleted ${person.name}`)
                    setTimeout(() => {
                        setMessage(null)
                      }, 3000)
                }
             }
                }>Delete</button> </b>
            </div>
            )}
        </>
    )
  }
  
  export default Person