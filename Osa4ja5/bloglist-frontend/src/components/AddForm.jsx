import { useState } from 'react'
import PropTypes from 'prop-types'

const AddForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('https://')
  const [likes, setLikes] = useState(0)

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: likes
    })

    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes(0)
  }

  return <form onSubmit={addBlog}>
    <h2>Add New Blog</h2>
    <div>
            Title: <input value={title} data-testid={'title'}
        onChange={({ target }) => setTitle(target.value)} />
    </div>
    <div>
            Author: <input value={author} data-testid={'author'}
        onChange={({ target }) => setAuthor(target.value)} />
    </div>
    <div>
            Url: <input type="url" value={url} placeholder="https://"
        onChange={({ target }) => setUrl(target.value)} />
    </div>
    <div>
            Likes: <input type="number" data-testid={'likes'} value={likes}
        onChange={({ target }) => setLikes(target.value)} />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
}

AddForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default AddForm