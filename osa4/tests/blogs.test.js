const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const reverse = require('./reverse.test')

const initialBlogs = reverse.listWithManyBlogs

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[3])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[4])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[5])
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
  expect(response.body).toHaveLength(initialBlogs.length)
})


  test('check that every blog has id', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(id => id.id)
    // console.log(contents)
    expect(contents).toHaveLength(initialBlogs.length)
  })

  test('check that random blog has identifier named id', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body[Math.floor(Math.random() * initialBlogs.length - 1)])
    expect(response.body[Math.floor(Math.random() * initialBlogs.length - 1)])
  })

test('test adding blogs to /api/blogs', async () => {
  const newBlog = {
    title: "testi",
    author: "testi",
    url: "www.testi.com",
    likes: 7
  }
  await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const contents = response.body.map(blog => blog.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain('testi')
})



afterAll(() => {
  mongoose.connection.close()
})