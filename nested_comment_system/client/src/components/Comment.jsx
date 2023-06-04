import {useState} from 'react'
import Iconbutton from './Iconbutton'
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from "react-icons/fa"
import { usePost } from '../contexts/PostContext'
import Commentlist from './Commentlist'

const Comment = ({comment}) => {

    const {message, id, user, createdAt} = comment
    const {getRepliesToComment} = usePost()
    const childComments = getRepliesToComment(id)
    const dateFormater = new Intl.DateTimeFormat(undefined, {
        dateStyle:"medium",
        timeStyle:"medium"
    })

    const [areChildrenHidden, setAreChildrenHidden] = useState(false)
  return (
    <>
        <div className='comment'>
            <div className='header'>
                <span className='name'>{user.name}</span>
                <span className='date'>{dateFormater.format(Date.parse(createdAt))}</span>
            </div>
            <div className='message'>
                {message}
            </div>
            <div className='footer'>
                <Iconbutton Icon={FaHeart} aria-label="Like">
                    2
                </Iconbutton>
                <Iconbutton Icon={FaReply} aria-label="Reply"/>
                <Iconbutton Icon={FaEdit} aria-label="Edit"/>
                <Iconbutton Icon={FaTrash} aria-label="Delete" color="danger"/>

            </div>
        </div>
        {childComments?.length > 0 &&(
            <>
                <div className={`nested-comments-stack ${areChildrenHidden ? " hide " :""}`}>
                    <button
                        aria-label='Hide Replies'
                        className='collapse-line'
                        onClick={()=>setAreChildrenHidden(true)}
                    />
                    <div className='nested-comments'>
                        <Commentlist comments={childComments}/>
                    </div>
                </div>
                <button
                    className={`btn mt-1 ${!areChildrenHidden ? "hide" :""}`}
                    onClick={()=>setAreChildrenHidden(false)}
                    style={{marginTop:"4px"}}
                >
                    Show  Replies
                </button>
            </>
        )}
    </>
  )
}

export default Comment