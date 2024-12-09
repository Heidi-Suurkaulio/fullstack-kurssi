import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import AddForm from './components/AddForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setNewFilter] = useState(false)
  const [filterSt, setNewFilterSt] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  /**
   * Searches for dublicates of the new name in the persons list
   * @param {list} persons list where the dublicates are checked
   * @param {string} nName new name candidate
   * @returns boolean weither or not the given name already exist in the list
   */
  function isDublicate(persons, nName) {
    return persons.some(pe => pe.name === nName)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (!isDublicate(persons, newName)) {
      const newPerson = { name: newName, number: newNumber }
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
    }
    else {
      alert(`${newName} is already added to phonebook`)
      setNewName("")
    }
  }

  /**
   * Filters persons names with string
   * @param {list} persons original list of persons
   * @param {string} fil comparsion string
   * @returns list of persons filtered with names that contains the string
   */
  function filterPersons(persons, fil) {
    return persons.filter(p => p.name.toLowerCase().includes(fil.toLowerCase()))
  }

  const filteredList = filtered
    ? filterPersons(persons, filterSt) //true
    : persons //false

  const handleFilter = event => {
    setNewFilterSt(event.target.value)
    setNewFilter(true)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter str={filterSt} handleFunction={handleFilter} />
      <h2>Add a new </h2>
      <AddForm submitfn={addPerson} name={newName} handleNameChange={handleNameChange}
        number={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons list={filteredList} />
    </div>
  )
}

export default App