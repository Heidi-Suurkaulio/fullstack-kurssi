import { useState } from 'react'

// components
const Button = ({ handleClick, text }) => (  
  <button onClick={handleClick}>    
    {text}  
  </button>
)

const StatisticLine = ({text, value, additional}) => (
  <tr>
    <td> {text} </td>
    <td> {value} {additional} </td>
  </tr>
)

const Statistics = ({good, neutral, bad, all, avg, positive}) => {
  if (all < 1) {
    return (
        <p>No feedback given</p>
    )
  }

  return (
      <table> 
        <tbody>    
        <StatisticLine text={'good :'} value={good} />
        <StatisticLine text={'neutral :'} value={neutral} />
        <StatisticLine text={'bad :'} value={bad} />
        <StatisticLine text={'all :'} value={all} />
        <StatisticLine text={'average :'} value={avg} />
        <StatisticLine text={'positive :'} value={positive} additional={'%'}/>
        </tbody>
      </table>
  )
}

// main component
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avgArr, setArr] = useState([])
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)

  // functions
  /// return the average feedback
  /// when good = 1, neutral = 0, bad = -1
  const countAvg = (array) => {
    return array.reduce((sum, currentValue) => sum + currentValue, 0) / array.length
  }

  /// return the share of positive feedback
  /// amount of digit 1 compared to everything else in the array
  const countPositive = (array) => {
    const p = array.filter((x) => x === 1)
    if (p.length < 1) return 0
    
    return (p.length / array.length) * 100
  }

  // Event handlers
  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(updatedGood + neutral + bad)
    const uArr = avgArr.concat(1)
    setAvg(countAvg(uArr))
    setPositive(countPositive(uArr))
    setArr(uArr)
  }

  const handleNeutral = () => {
    const uNeutral = neutral + 1
    setNeutral(uNeutral)
    setAll(good + uNeutral + bad)
    const uArr = avgArr.concat(0)
    setAvg(countAvg(uArr))
    setPositive(countPositive(uArr))
    setArr(uArr)
  }

  const handleBad = () => {
    const uBad = bad + 1
    setBad(uBad)
    setAll(good + neutral + uBad)
    const uArr = avgArr.concat(-1)
    setAvg(countAvg(uArr))
    setPositive(countPositive(uArr))
    setArr(uArr)
  }

  // Structure of the site
  return (
    <div>
      <div>
        <p><b>give feedback</b></p>
      <Button handleClick={handleGood} text = 'good' />        
      <Button handleClick={handleNeutral} text = 'neutral' />
      <Button handleClick={handleBad} text = 'bad' />
        <p><b>Statistics</b></p>
      <Statistics good = {good} neutral = {neutral} bad = {bad} 
      all = {all} avg = {avg} positive = {positive} />
      </div>
    </div>
  )
}

export default App