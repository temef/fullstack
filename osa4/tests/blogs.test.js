const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const reverse = require('./reverse.test')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const initialBlogs = reverse.listWithManyBlogs

const api = supertest(app)
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'sudo', passwordHash })
  await user.save()
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
  .post("/api/login")
  .send({ username: "sudo", password: "sekret"})
  .then((res) => {
    return (token = res.body.token)
})

  await api
    .post('/api/blogs')
    .set("Authorization", `bearer ${token}`)
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
    // console.log(response.body[Math.floor(Math.random() * initialBlogs.length - 1)])
    expect(response.body[Math.floor(Math.random() * initialBlogs.length - 1)])
  })

// test('test adding blogs to /api/blogs', async () => {
//   const newBlog = {
//     title: "testi",
//     author: "testi",
//     url: "www.testi.com",
//     likes: 7
//   }
//   await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  
//   const blogsAtEnd = await helper.blogsInDb()
//   expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
//   const contents = blogsAtEnd.map(blog => blog.title)
//   expect(contents).toContain('testi')
// })

// test('adding blog without likes automatically puts likes to 0', async () => {
//   const newBlog = {
//     title: "withoutlikes",
//     author: "testi",
//     url: "www.testi.com",
//   }
//   await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

//   const blogsAtEnd = await helper.blogsInDb()
//   expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
//   const check = blogsAtEnd.filter(blog => blog.likes === 0)
//   expect(check.map(blog => blog.title)).toContain('withoutlikes')

// })

// test('adding blog without title and url should give bad request error 400', async () => {
  
//   const newBlog = {
//     author: "testi",
//   }
//   await api.post('/api/blogs').send(newBlog).expect(400)

// })

test('deleting blog', async () => {
  
  const newBlog = {
    title: "uusi",
    author: "meitsi",
    url: "www.com.com",
    likes: 1
  }
  
  await api
    .post("/api/login")
    .send({ username: "sudo", password: "sekret"})
    .then((res) => {
      return (token = res.body.token)
  })
  await api.post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(newBlog)
    .expect(201).expect('Content-Type', /application\/json/)

  const blogsAtStart = await helper.blogsInDb()
  // console.log(blogsAtStart)
  

  await api.delete(`/api/blogs/${blogsAtStart[blogsAtStart.length-1].id}`)
  .set("Authorization", `bearer ${token}`)
  .expect(204)
  
  
  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(initialBlogs.length)

  const contents = blogsAtEnd.map(blog => blog.title)
  expect(contents).not.toContain("uusi")
})


test('editing likes', async () => {
  const newLikes = {
    likes: 1000
  }

  const blogsAtStart = await helper.blogsInDb()
  const blogToEdit = blogsAtStart[0]

  await api.put(`/api/blogs/${blogToEdit.id}`).send(newLikes).expect(200)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(initialBlogs.length)
  const contents = blogsAtEnd.map(blog => blog.likes)
  expect(contents).toContain(1000)
})

describe('when there is initially one user at db', () => {

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'teemu',
      name: 'Teemu Temetius',
      password: 'topsecret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      username: 'sudo',
      name: 'Superuser',
      password: 'vinkkaus',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username taken')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username or password length is smaller than 3', async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser1 = {
      username: 'su',
      name: 'Superuser',
      password: 'vinkkaus',
    }

    const newUser2 = {
      username: 'suddo',
      name: 'Superuser',
      password: 'vi',
    }

    const result = await api
      .post('/api/users')
      .send(newUser2)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('Password min length is 3')
    

    const result2 = await api
      .post('/api/users')
      .send(newUser1)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result2.body.error).toContain('Username min length is 3')

    // console.log(`result1: ${result.body.error} and result2: ${result2.body.error}`)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('adding blog without a proper token', async () => {

    const newBlog = {
      title: "notoken",
      author: "noToken",
      url: "validator.com",
      likes: 0
    }

    await api
    .post("/api/login")
    .send({ username: "sudo", password: "sekret"})
    .then((res) => {
      return (token = res.body.token)
  })

    await api
    .post('/api/blogs')
    .set("Authorization", `bearer ${null}`)
    .send(newBlog)
    .expect(401)

      // .expect('Content-Type', /application\/json/)
      // .expect(result.body.error).toContain('Username min length is 3')
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    
    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).not.toContain(
      'notoken'
    )
  })
  
})


afterAll(() => {
  mongoose.connection.close()
})