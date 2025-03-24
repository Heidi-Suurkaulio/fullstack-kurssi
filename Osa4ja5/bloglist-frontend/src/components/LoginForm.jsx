import PropTypes from 'prop-types'

const loginForm = ({ handleLogin, username, password,
  setUsername, setPassword
}) => {
  return <form onSubmit={handleLogin}>
    <h2>Log in to application</h2>
    <div>
            username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
            password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">Log In</button>
  </form>
}

loginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string,
  password: PropTypes.string,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default loginForm