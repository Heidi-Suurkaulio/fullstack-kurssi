import { useState } from 'react'

const Blog = ({ blog, increaseLikes }) => {
  const [showAll, setShowAll] = useState(false)

  const hideDetails = {
    border: '0.1em solid black',
    padding: '0.25em',
    margin: '0.25em',
    display: showAll ? 'none' : ''
  }
  const showDetails = {
    border: '0.1em solid black',
    padding: '0.25em',
    margin: '0.25em',
    display: showAll ? '' : 'none'
  }

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  const like = (event) => {
    event.preventDefault()
    increaseLikes(blog.id, {likes: blog.likes += 1})
  }

  return <div>
    <div style={hideDetails}>
      <strong>{blog.title}</strong> {blog.author}
      <button onClick={toggleShowAll} style={{float: 'right'}}>
        Show Details
      </button>
    </div>
    <div style={showDetails}>
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
    </div>
  </div>
}

export default Blog