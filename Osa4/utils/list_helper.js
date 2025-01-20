const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const le = blogs.length
    
    if (le < 1) return 0

    const sum = blogs.reduce((accumulator, current) => 
        accumulator + current.likes, 0)
    return sum
}

const favoriteBlog = (blogs) => {
    const le = blogs.length

    if (le < 1) return {}

    let index = 0
    let max = 0

    blogs.forEach((blog, i) => {
        if (max < blog.likes) {
            max = blog.likes
            index = i
        }
    })
    
    const fav = blogs[index]
    return {title: fav.title, author: fav.author, likes: fav.likes}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}