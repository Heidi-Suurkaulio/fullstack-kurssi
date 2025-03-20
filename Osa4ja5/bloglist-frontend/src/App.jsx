import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
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
  // for notifications
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)
  
  const addFormRef = useRef()

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

  const doNotification = (state, msg) => {
    setError(state)
    setNotification(msg)
    setTimeout(() => 
      setNotification(null), 1000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      doNotification(false, `${username} succesfully logged in`)
      setUsername('')
      setPassword('')
    } catch (except) {
      doNotification(true, 'Wrong username of password!')
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    try {
      doNotification(false, `${user.name} logging out!`)
      setUser(null)
      window.localStorage.clear()
    } catch (except) {
      doNotification(true, except.message)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      const respBlog = await blogService.create(blogObject)
      addFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(respBlog))
      doNotification(false, `${blogObject.title} added`)
    } catch (except) {
      doNotification(true, 'Adding blog failed')
    }
  }

  return (
    <div>
      <Notification message={notification} error={error}/>
      {!user && 
      <LoginForm handleLogin={handleLogin} username={username} 
      setUsername={setUsername} password={password} 
      setPassword={setPassword}/>
      }
      {user && <div>
        <p>{user.name} logged in
          <button onClick={handleLogOut}>Log Out</button>
        </p>
        <Togglable buttonLabel='Add New Blog' ref={addFormRef}>
        <AddForm createBlog={addBlog}/>
        </Togglable>
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