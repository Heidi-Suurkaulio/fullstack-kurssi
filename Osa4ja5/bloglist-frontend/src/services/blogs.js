import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const conf = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, conf)
  return response.data
}

const remove = async id => {
  const conf = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, conf)
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default { setToken, getAll, create, remove, update }