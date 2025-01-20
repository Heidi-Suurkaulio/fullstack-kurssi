const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one'), () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
}

describe('total likes', () => {
    const listNoBlogs = []

    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const listWithManyBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f7',
            title: 'The “delay-the-reckoning heuristic” in pro football?',
            author: 'Andrew Gelman',
            url: 'https://statmodeling.stat.columbia.edu/',
            likes: 9,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f6',
            title: 'Hirmuisten liskojen menneisyys',
            author: 'Heikki Kämäräinen',
            url: 'https://www.jyu.fi/fi/blogikirjoitus/hirmuisten-liskojen-menneisyys',
            likes: 6,
            __v: 0
        }
    ]

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(listNoBlogs)
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithManyBlogs)
        assert.strictEqual(result, 20)
    })
})

describe('favorite blog', () => {
    const noBlogs = []

    const listWithOneBlogFav = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        }
    ]

    const listWithManyBlogsFav = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
        }
    ]

    test('of empty list is empty', () => {
        const result = listHelper.favoriteBlog(noBlogs)
        assert.deepEqual(result, {})
    })

    test('when the list has one blog return that', () => {
        const result = listHelper.favoriteBlog(listWithOneBlogFav)
        assert.deepEqual(result, {
            title: "React patterns",
            author: "Michael Chan",
            likes: 7
        })
    })

    test('of a bigger list, the right one', () => {
        const result = listHelper.favoriteBlog(listWithManyBlogsFav)
        assert.deepEqual(result, {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        })
    })
})