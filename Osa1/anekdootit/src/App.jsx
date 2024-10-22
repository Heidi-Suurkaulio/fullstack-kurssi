import { useState } from 'react'

// components
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)
  const [maxVotes, setMaxVotes] = useState(0)

  // event handlers
  const selectAnecdote = () => {
    const num = Math.random() * (anecdotes.length - 0) + 0;
    setSelected(Math.floor(num))
  }

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    const votes = Math.max(...copy)
    setMaxVotes(votes)
    setMostVoted(copy.indexOf(votes))
    setPoints(copy) // update happens somewhere after this...
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>
      {anecdotes[selected]}
      </p>
      <Button text={'vote'} handleClick={vote} />
      <Button text={'next anecdote'} handleClick={selectAnecdote} />
      <h2>Anecdote with most votes</h2>
      <p>
      {anecdotes[mostVoted]} Votes: {maxVotes}
      </p>
    </div>
  )
}

export default App