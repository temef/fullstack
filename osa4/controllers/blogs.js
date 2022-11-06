const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username:1, name:1})
        response.json(blogs)
  })

  blogsRouter.post('/', async (request, response, next) => {
    const body = request.body


    //console.log(body)
    const user = request.user
    console.log(user)

    let likes = 0
    if(body.likes) {
      likes = body.likes
    }
    
    const blog = new Blog ({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: likes,
      user: user.id
    })

    if(blog.title && blog.url) {

    try{
    const savedBlog = await blog.save()
    //console.log(savedBlog.id)
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    //console.log(user.blogs)

    response.status(201).json(savedBlog)

    } catch(exception) {
      next(exception)
    }
  } else {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const body = request.body
  
    const user = request.user
    const blog = await Blog.findById(request.params.id)
  try{
    if ( blog.user.toString() === user.id.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
    } else {
      return response.status(401).json({ error: 'Cannot delete other users blogs' })
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const newLikes = {
    likes: body.likes
  }
  try{
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newLikes, {new: true})
  response.json(updatedBlog)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter