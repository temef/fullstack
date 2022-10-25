const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    let sum = 0
    blogs.map(obj => sum += obj.likes )
    return sum
  }
const favoriteBlog = (blogs) => {
    let fav = blogs[0]

    blogs.map(obj => {
        if(obj.likes > fav.likes) fav = obj
    })

    return { title: `${fav.title}`, author: `${fav.author}`, likes: fav.likes}
}
  
const mostBlogs = (blogs) => {
    const authorList = []
    const values = {}
    const arr = []
    blogs.map(obj => authorList.push(obj.author))
    // console.log(authorList)
    
    authorList.forEach((x) => {values[x] = (values[x] || 0) + 1})
    // console.log(values)
    for(const value in values) {
        arr.push({ author:value, blogs:values[value]})
    }
    
   return arr.sort((a,b) => b.blogs-a.blogs)[0]
} 

const mostLikes = (blogs) => {
    const values = {}
    const arr = []
    blogs.forEach((x) => {values[x.author] = {likes: values[x.author] ? values[x.author].likes + x.likes : x.likes }})
    // console.log(values)

    for(const value in values) {
        arr.push( { author:value, ...values[value]} )
    }

    return arr.sort((a,b) => b.likes-a.likes)[0]
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }

  