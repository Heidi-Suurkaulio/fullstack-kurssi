import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, userId, increaseLikes, removeBlog }) => {
  const [showAll, setShowAll] = useState(false)

  const hideDetails = {
    border: '0.1em solid black',
    padding: '0.25em',
    margin: '0.25em',
    display: showAll ? 'none' : 'block'
  }
  const showDetails = {
    border: '0.1em solid black',
    padding: '0.25em',
    margin: '0.25em',
    display: showAll ? 'block' : 'none'
  }
  const removeButtonStyle = {
    float: 'right',
    display: blog.user.id === userId ? 'block' : 'none'
  }

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  const like = (event) => {
    event.preventDefault()
    increaseLikes(blog.id, { likes: blog.likes += 1 })
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Do you want to remove blog ${blog.title}`)) {
      removeBlog(blog)
    }
  }

  return <div>
    <div style={hideDetails}>
      <strong>{blog.title}</strong> {blog.author}
      <button onClick={toggleShowAll} style={{ float: 'right' }}>
        Show Details
      </button>
    </div>
    <div style={showDetails} className='details'>
      <ul style={{ listStyleType: 'none' }}>
        <li>
          <strong>{blog.title}</strong>
        </li>
        <li>
          {blog.author}
        </li>
        <li>
          <a href={blog.url}>{blog.url}</a>
        </li>
        <li>
          likes: {blog.likes}
          <button onClick={like}> Like </button>
        </li>
        <li>
          {blog.user.name}
        </li>
      </ul>
      <button onClick={toggleShowAll}>
        Hide Details
      </button>
      <button onClick={deleteBlog} style={removeButtonStyle}>
        Delete
      </button>
    </div>
  </div>
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  increaseLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog