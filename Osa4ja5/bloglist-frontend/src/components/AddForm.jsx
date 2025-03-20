import { useState } from "react"

const AddForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('https://')
    const [likes, setLikes] = useState(0)

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
            likes: likes
        })

        setTitle('')
        setAuthor('')
        setUrl('https://')
        setLikes(0)
    }
    
    return <form onSubmit={addBlog}>
        <h2>Add New Blog</h2>
        <div>
            Title: <input value={title}
                onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
            Author: <input value={author}
                onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
            Url: <input value={url}
                onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
            Likes: <input type="number" value={likes}
                onChange={({ target }) => setLikes(target.value)} />
        </div>
        <div>
            <button type="submit">Add</button>
        </div>
    </form>
}

export default AddForm