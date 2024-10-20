import { useState } from 'react'

const Button = ({ handleClick, text }) => (  
  <button onClick={handleClick}>    
    {text}  
  </button>
)

const Display = ({good, neutral, bad}) => {
  return (
    <div>
      <p>Statistics</p>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    //setGood(good + 1)
    //console.log(good)
    const updatedGood = good + 1
    setGood(updatedGood)
    //console.log(good)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    //console.log(neutral)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <p>give feedback</p>
      <Button handleClick={handleGood} text = 'good' />        
      <Button handleClick={handleNeutral} text = 'neutral' />
      <Button handleClick={handleBad} text = 'bad' />
      </div>
      <Display good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App