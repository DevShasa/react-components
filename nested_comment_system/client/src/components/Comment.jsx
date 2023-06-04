import React from 'react'

const Comment = ({comment}) => {

    const {message, id, user, createdAt} = comment
    const dateFormater = new Intl.DateTimeFormat(undefined, {
        dateStyle:"medium",
        timeStyle:"medium"
    })
  return (
    <div className='comment'>
        <div className='header'>
            <span className='name'>{user.name}</span>
            <span className='date'>{dateFormater.format(Date.parse(createdAt))}</span>
        </div>
        <div className='message'>
            {message}
        </div>
        <div className='footer'>

        </div>
    </div>
  )
}

export default Comment