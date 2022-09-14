const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((previous, current) => 
    previous + current.exercises, 0
  )

  return(
    <b>total of {totalExercises} exercises</b>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part =>
    <Part key={part.id} part={part}/>
 )}
  </>
  

const Course = ({ course }) => {
    return(
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts} />
        </div>
    )

}

  export default Course