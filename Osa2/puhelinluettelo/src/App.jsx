import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleListChange = (event) => {
    setNewName(event.target.value)
  }
  
  const addName = (event) => {
    event.preventDefault()
    const newPerson = {name: newName}
    setPersons(persons.concat(newPerson))
    setNewName("")
  }
  
  //TODO korjaa vaarallinen indeksi
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
        {persons.map((p, i) =>
          <li key={i}> {p.name} </li>
        )
        }
      </ul>
    </div>
  )

}

export default App