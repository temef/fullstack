import { useState } from 'react'

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
    <div>
      <h1>statistic</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {(good-bad)/all}</div>
      <div>positive {(good/all)*100} %</div>
      </div>

  )
}
const Buttons = ({plusgood, plusbad, plusneutral}) => {
  return(
    <div>
    <button onClick={plusgood}>
        good
      </button>
      <button onClick={plusneutral}>
        neutral
      </button>
      <button onClick={plusbad}>
        bad
      </button>
    </div>
  )
}
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
      <Buttons plusgood={plusgood} plusbad={plusbad} plusneutral={plusneutral}/>
      <Statistic good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App