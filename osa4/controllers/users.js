const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if(existingUser) {
    return response.status(400).json({
        error: 'username taken'
    })
  }
  
  if(username && username.length < 3) {
    return response.status(400).json({
      error: "Username min length is 3"
    })
  }

  if(password && password.length < 3) {
    return response.status(400).json({
      error: "Password min length is 3"
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const user = await User.find({}).populate('blogs', {url:1, title:1, author:1})
  response.json(user)
})


module.exports = usersRouter