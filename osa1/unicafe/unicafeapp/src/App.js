import { useState } from 'react'

const StatisticLine = ({text, value}) => (<tbody><tr><td>{text}</td><td>{value}</td></tr></tbody>)




const Statistic = ({good, neutral, bad, all}) => {
  if(all === 0) {
    return(
      <div>
        <h1>statistic</h1>
        No feedback given
      </div>
    )
  }
  return(
    <div><h1>statistic</h1>
    <table>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value ={(good-bad)/all} />
      <StatisticLine text="positive" value ={(good/all)*100 + " %"} />
    </table>
    </div>
  )
}
const Button = ({ click, name }) => (
  <button onClick={click}>
    {name}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const plusgood = () => setGood(good + 1)
  const plusneutral = () => setNeutral(neutral + 1)
  const plusbad = () => setBad(bad + 1)
  let all = good+neutral+bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button click={plusgood} name='good'/> 
      <Button click={plusneutral} name='neutral'/> 
      <Button click={plusbad} name='bad'/> 
      <Statistic good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App