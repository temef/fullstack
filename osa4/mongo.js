const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]


const url =
  `mongodb+srv://fullstack:${password}@cluster0.byeywez.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url)

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

  const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    title: "eka Blogi",
    author: "teemu",
    url: "www.testi.com",
    likes: 69
})

blog.save().then(result => {
    console.log('blog saved!')
    mongoose.connection.close()
  })
