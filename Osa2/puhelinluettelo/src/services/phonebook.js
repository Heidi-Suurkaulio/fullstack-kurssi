import axios from 'axios'
// baseUrl changed for 3.11 previous localhost
const baseUrl = '/api/persons'

// No error handling yet...
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

// name or id as an identifier?
const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then()
}

export default { getAll, create, update, remove }

