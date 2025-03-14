const Notification = ({ message, error }) => {
    if (message && error === false) {
        const style = {
            padding: '0.5em',
            borderBottom: '0.25em solid green',
            fontSize: 'larger'
        }
        return (
            <div className="notification" style={style}>
                {message}
            </div>
        )
    }

    if (message && error === true) {
        const errorStyle = {
            padding: '0.5em',
            borderBottom: '0.25em solid red',
            fontSize: 'larger'
        }
        return (        
        <div className="error" style={errorStyle}>
            {message}
        </div>
        )
    }
    
    return(null)
}

export default Notification