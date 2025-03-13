const AddForm = ({ submitfn, title, setTitle, author, 
    setAuthor, url, setUrl }) => {
    return <form onSubmit={submitfn}>
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
            <button type="submit">Add</button>
        </div>
    </form>
}

export default AddForm