const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })

  blogsRouter.post('/', (request, response) => {
    const body = request.body
    let likes = 0

    if(body.likes) {
      likes = body.likes
    }
    
    const blog = new Blog ({
      title: body.title,
      author: body.author,
      ulr: body.url,
      likes: likes
    })

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
})

module.exports = blogsRouter