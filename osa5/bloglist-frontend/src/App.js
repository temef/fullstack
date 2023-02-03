import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import { Notifications } from './components/Notifications';
import loginService from './services/loginService';
import LoginForm from './components/Login';
import './index.css';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import { useNotification } from './hooks/useNotification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState([]);
  const [username, setUsername] = useState([]);
  const { show } = useNotification();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      show(`${user.name} has logged in`);
    } catch (exception) {
      show('wrong username or password', true);
    }
  };

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        show(`A new blog: ${returnedBlog.title} by ${returnedBlog.author} added!`);
      })
      .catch(() => {
        show(`Remember to put Title, Author and Url!`, true);
      });
  };

  const logout = () => {
    window.localStorage.removeItem('loggedAppUser');
    show(`${user.name} has logged out`);
    setUser(null);
  };

  const plusLike = async (id) => {
    const blog = blogs.find((n) => n.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    // console.log(blog, changedBlog)
    try {
      const newBlog = await blogService.update(id, changedBlog);
      console.log(blogs);
      setBlogs(blogs.map((b) => (b.id !== id ? b : newBlog)));
      console.log(id);
    } catch (exception) {
      show(`${exception}`, true);
      setBlogs(blogs.filter((n) => n.id !== id));
    }
  };

  const sortBlogs = blogs.sort((a, b) => b.likes - a.likes);

  const removeBlog = async (id, title) => {
    if (window.confirm(`Do you want to remove "${title}?"`)) {
      await blogService.remove(id);
      setBlogs(blogs.filter((n) => n.id !== id));
      show(`${title} removed`);
    }
  };

  return (
    <div>
      <h1>Blogs application</h1>

      <Notifications />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <b>{user.name} has logged in.</b>{' '}
          <button onClick={logout}>Logout</button>
          <Togglable buttonLabel="New blog">
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <h2>All blogs:</h2>
          {sortBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              addLike={plusLike}
              user={user}
              removeBlog={removeBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
