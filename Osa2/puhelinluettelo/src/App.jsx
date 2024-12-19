import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import AddForm from './components/AddForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setNewFilter] = useState(false)
  const [filterSt, setNewFilterSt] = useState('')

  /**
   * get the data from db.json
   * should have some error handling...
   */
  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }

  /**
 * call for function which gets the data
 */
  useEffect(hook, [])

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
      axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))      
        setNewName('')
        setNewNumber('')   
      })
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