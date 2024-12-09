const Filter = ({ str, handleFunction }) => {
    return <form>
        <div>
            Filter: <input value={str}
                onChange={handleFunction} />
        </div>
    </form>
}

export default Filter