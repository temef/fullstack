import { useState } from "react"

const Blog = ({ blog, user, addLike, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const [view, setView] = useState(false)
  const toggleView = () => {
    setView(!view)
  }

  const like = () => {
    addLike(blog.id)
  }

  const remove = () => {
    removeBlog(blog.id, blog.title)
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        <b>Title:</b> {blog.title} <b> Author:</b> {blog.author}
        <button onClick={toggleView}> {view ? "Hide" : "Show"} </button>
      </div>
      {view && (
        <div className="showed">
          <p>{blog.url}</p>
          <p>
            <b>Likes:</b> {blog.likes} <button id='like' onClick={like}> Like </button>
          </p>
          <b>{user.username}</b>
          <div>
            <button onClick={remove}>Remove</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
