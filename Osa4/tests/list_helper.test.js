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