const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => (
  <form onSubmit={handleLogin}>
    <h2>Login to application</h2>
    <div>
      Username:
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
        id="username"
      />
    </div>
    <div>
      Password:
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        id="password"
      />
    </div>
    <button id="login-button" type="submit">
      login
    </button>
  </form>
);

export default LoginForm;
