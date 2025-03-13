import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import AddForm from './components/AddForm'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // for handling blog
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('https://')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (except) {
      alert('wrong credentials') //TODO fix
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    
    const respBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(respBlog))
    setTitle('')
    setAuthor('')
    setUrl('https://')
  }

  return (
    <div>
      {!user && 
      <LoginForm handleLogin={handleLogin} username={username} 
      setUsername={setUsername} password={password} 
      setPassword={setPassword}/>
      }
      {user && <div>
        <p>{user.name} logged in
          <button onClick={handleLogOut}>Log Out</button>
        </p>
        <AddForm submitfn={addBlog} title={title} setTitle={setTitle}
        author={author} setAuthor={setAuthor} url={url} setUrl={setUrl}/>
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      }
    </div>
  )
}

export default App