import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleListChange = (event) => {
    setNewName(event.target.value)
  }

  function isDublicate(nName) {
    return persons.some(pe => pe.name === nName)
  }

  const addName = (event) => {
    event.preventDefault()
    if (!isDublicate(newName)) {
      const newPerson = {name: newName}
      setPersons(persons.concat(newPerson))
      setNewName("")
    }
    else {
      alert(`${newName} is already added to phonebook`)
      setNewName("")
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName}
          onChange={handleListChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(p =>
          <li key={p.name}> {p.name} </li>
        )
        }
      </ul>
    </div>
  )
}

export default App