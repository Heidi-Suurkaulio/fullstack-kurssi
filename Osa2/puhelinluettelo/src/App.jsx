import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import Persons from './components/Persons'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setNewFilter] = useState(false)
  const [filterSt, setNewFilterSt] = useState('')
  const [notificationMsg, setNotificationMsg] = useState('')

  /**
   * get the data from db.json
   * should have some error handling...
   */
  const hook = () => {
    phonebookService.getAll()
    .then(initialPersons => {        
      setPersons(initialPersons)      
    })
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
    if (isDublicate(persons, newName)) {
      if (confirm(`${newName} is already added to phonebook, 
      replace the old number with a new one`)) {
        const toChange = persons.find(p => p.name === newName)
        const changedP = {...toChange, number: newNumber}

        phonebookService
        .update(toChange.id, changedP)
        .then(response => {
          const iid = response.id
          setPersons(persons.map(pe => pe.id !== iid ? pe : response))
        })
      }
      setNewName("")
      setNewNumber("")
      setNotificationMsg(`Changed ${newName}'s number`)
      setTimeout(() => 
      setNotificationMsg(null), 500)
    }
    else {
      const newPerson = { name: newName, number: newNumber }
      phonebookService.create(newPerson)
      .then(returnedPerson => {        
        setPersons(persons.concat(returnedPerson))      
        setNewName('')
        setNewNumber('')   
      })
      setNotificationMsg(`Added ${newName}`)
      setTimeout(() => 
      setNotificationMsg(null), 500)
    }
  }

  const removePerson = (name, id) => {
    if (confirm(`Do you want to remove ${name}`)) {
      const i = persons.findIndex((p) => p.id === id)
      phonebookService.remove(id)
      .then(
        setPersons(persons.toSpliced(i, 1))
      )
      setNotificationMsg(`Removed ${name}`)
      setTimeout(() => 
      setNotificationMsg(null), 500)
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
      <Notification message={notificationMsg} />
      <Filter str={filterSt} handleFunction={handleFilter} />
      <h2>Add a new </h2>
      <AddForm submitfn={addPerson} name={newName} handleNameChange={handleNameChange}
        number={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons list={filteredList} removeFn={removePerson}/>
    </div>
  )
}

export default App