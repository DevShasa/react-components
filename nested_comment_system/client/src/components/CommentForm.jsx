import {useState} from 'react'

const CommentForm = ({loading, error, autoFocus=true, onSubmit, initialValue=""}) => {

    const [message, setMessage] = useState(initialValue)

    function handleSubmit(e){
        e.preventDefault()
        onSubmit(message).then(()=>setMessage(""))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='comment-form-row'>
                <textarea 
                    autoFocus = {autoFocus}
                    value = {message}
                    className='message-input'
                    onChange = {e => setMessage(e.target.value)}
                />
                <button className='btn'disabled={loading} type="submit">
                    {loading ? "Loading" :"Post"}
                </button>
            </div>
            <div className='error-msg'>{error}</div>
        </form>
    )
}

export default CommentForm