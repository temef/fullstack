const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const reverse = require('./reverse.test')
const initialBlog = reverse.listWithManyBlogs

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlog[0])
  await blogObject.save()
  blogObject = new Blog(initialBlog[1])
  await blogObject.save()
  blogObject = new Blog(initialBlog[2])
  await blogObject.save()
  blogObject = new Blog(initialBlog[3])
  await blogObject.save()
  blogObject = new Blog(initialBlog[4])
  await blogObject.save()
  blogObject = new Blog(initialBlog[5])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlog.length)
})


  test('check that every blog has id', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(id => id.id)
    // console.log(contents)
    expect(contents).toHaveLength(initialBlog.length)
  })

  test('check that random blog has identifier named id', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body[Math.floor(Math.random() * initialBlog.length - 1)])
    expect(response.body[Math.floor(Math.random() * initialBlog.length - 1)])
  })




afterAll(() => {
  mongoose.connection.close()
})