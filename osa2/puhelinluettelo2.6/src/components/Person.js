import personService from '../services/persons'

const Person = ({ persons, setPersons }) => {
    return (
        <>
            {persons.map(person =>
            <div key={person.name}>
            <b> {person.name} {person.number} <button onClick={() => 
                {if(personService.deleteName(person)) {setPersons((persons) => persons.filter((p) => p.name !== person.name))}}
                }>Delete</button> </b>
            </div>
            )}
        </>
    )
  }
  
  export default Person