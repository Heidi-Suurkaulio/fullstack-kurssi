const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length < 1) return 0

    const sum = blogs.reduce((accumulator, current) =>
        accumulator + current.likes, 0)
    return sum
}

const favoriteBlog = (blogs) => {
    if (blogs.length < 1) return {}

    const fav = blogs.reduce((accumulator, current) => {
        if (accumulator.likes < current.likes) return current
        return accumulator
    })

    return { title: fav.title, author: fav.author, likes: fav.likes }
}

const mostBlogs = (blogs) => {
    if (blogs.length < 1) return {}

    const authors = []
    blogs.forEach(blog => {
        const author = (authors.find(({ name }) =>
            name === blog.author))
        if (author) {
            author.blogs = author.blogs + 1
            return
        }
        const newAuth = { name: blog.author, blogs: 1 }
        authors.push(newAuth)
    })

    const maxBlogs = authors.reduce((accumulator, current) => {
        if (accumulator.blogs < current.blogs) return current
        return accumulator
    })

    return maxBlogs
}

const mostLikes = (blogs) => {
    if (blogs.length < 1) return {}

    const authors = []
    blogs.forEach(blog => {
        const author = (authors.find(({ name }) =>
            name === blog.author))
        if (author) {
            author.likes = author.likes + blog.likes
            return
        }
        const newAuth = { name: blog.author, likes: blog.likes }
        authors.push(newAuth)
    })
    
    const maxLikes = authors.reduce((accumulator, current) => {
        if (accumulator.likes < current.likes) return current
        return accumulator
    })

    return maxLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}