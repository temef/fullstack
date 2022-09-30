import personService from '/Users/teemuromo/fullstack/osa2/puhelinluettelo2.6/src/services/persons.js'

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