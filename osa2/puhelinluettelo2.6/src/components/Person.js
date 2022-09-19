const Person = ({ persons }) => {
    return (
        <>
            {persons.map(person =>
            <div key={person.name}>
            <b> {person.name} {person.number}</b>
            </div>
            )}
        </>
    )
  }
  
  export default Person