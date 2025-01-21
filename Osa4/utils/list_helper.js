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
    
    const fav = blogs.reduce((accumulator, current) => {
        if (accumulator.likes < current.likes) return current
        return accumulator
    })

    return {title: fav.title, author: fav.author, likes: fav.likes}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}