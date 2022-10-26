const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const reverse = require('./reverse.test')
const helper = require('./test_helper')

const initialBlogs = reverse.listWithManyBlogs

const api = supertest(app)
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
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

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "valid",
    author: "validator",
    url: "validator.com",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
  
    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).toContain(
      'valid'
    )
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
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
  const contents = blogsAtEnd.map(blog => blog.title)
  expect(contents).toContain('testi')
})

test('adding blog without likes automatically puts likes to 0', async () => {
  const newBlog = {
    title: "withoutlikes",
    author: "testi",
    url: "www.testi.com",
  }
  await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
  const check = blogsAtEnd.filter(blog => blog.likes === 0)
  expect(check.map(blog => blog.title)).toContain('withoutlikes')

})

test('adding blog without title and url should give bad request error 400', async () => {
  const newBlog = {
    author: "testi",
  }
  await api.post('/api/blogs').send(newBlog).expect(400)

})

afterAll(() => {
  mongoose.connection.close()
})