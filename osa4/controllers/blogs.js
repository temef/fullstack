const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        response.json(blogs)
  })

  blogsRouter.post('/', async (request, response) => {
    const body = request.body
    let likes = 0

    if(body.likes) {
      likes = body.likes
    }
    
    const blog = new Blog ({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: likes
    })
    if(blog.title && blog.url) {
    try{
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
    } catch(exception) {
      response.status(400)
    }
  } else {
    response.status(400).end()
  }
})

module.exports = blogsRouter