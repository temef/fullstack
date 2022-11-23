import { useState } from 'react'

const BlogForm = ({ createBlog, setVisible }) => {
  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setUrl] = useState([])

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    setVisible(false)
  }

  return(
    <form onSubmit={addBlog}>
      <h3>Add a new blog</h3>
      <div>
        Title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default BlogForm