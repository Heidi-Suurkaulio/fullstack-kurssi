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

module.exports = {
    dummy,
    totalLikes
}