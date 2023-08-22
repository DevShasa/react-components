import { useState } from "react";
import Iconbutton from "./Iconbutton";
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from "react-icons/fa";
import { usePost } from "../contexts/PostContext";
import Commentlist from "./Commentlist";
import CommentForm from "./CommentForm";
import { useAsyncFn } from "../hooks/useAsync";
import { createComment, deleteComment, updateComment, toggleCommentLike } from "../services/comment";
import { useUser } from "../hooks/useUser";

const Comment = ({ comment }) => {
	const { message, id, user, createdAt, likeCount, likedByMe } = comment;
   // console.log("LIKED BY ME",likedByMe)
	const { getRepliesToComment, createLocalComment, post, updateLocalComment, deleteLocalComment, toggleLocalCommentLike } = usePost(); // contexts grabs the post id from the url 
    const currentUser = useUser()
    const childComments = getRepliesToComment(id);
    const {loading, error, execute} = useAsyncFn(createComment)
    const updateCommentFn = useAsyncFn(updateComment)
    const deleteCommentFN = useAsyncFn(deleteComment)
    const toggleCommentlikeFN = useAsyncFn(toggleCommentLike)
	const dateFormater = new Intl.DateTimeFormat(undefined, {
		dateStyle: "medium",
		timeStyle: "medium",
	});

    async function onCommentReply(message){
        try {
            const comment = await execute({ postId:post.id, message, parentId:id})
           createLocalComment(comment)
           setIsReplying(false)
        } catch (error) {
            console.log("POST ERROR")
        }
    }

    async function onCommentUpdate(message){
        try {
            const comment = await updateCommentFn.execute({postId:post.id, message, id})
            setIsEditing(false)
            updateLocalComment(id, comment.message)
        } catch (error) {
            console.log("ERROR UODATING LOCAL COMMENT")
        }
    }

    async function onCommentDelete(){
        try {
            const comment = await deleteCommentFN.execute({postId: post.id, id})
            deleteLocalComment(comment.id)
        } catch (error) {
            console.log("ERROR DELETING COMMENT--->",error)
        }
    }

    async function onToggleCommentLike(){
        try {
            const res = await toggleCommentlikeFN.execute({id, postId: post.id})
           toggleLocalCommentLike(id, res.addlike)
        } catch (error) {
            console.log("ERROR LIKING COMMENT")
        }
    }

	const [areChildrenHidden, setAreChildrenHidden] = useState(false);
    const [isReplying, setIsReplying] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

	return (
		<>
			<div className="comment">
				<div className="header">
					<span className="name">{user.name}</span>
					<span className="date">
						{dateFormater.format(Date.parse(createdAt))}
					</span>
				</div>
                {isEditing && (
                    <CommentForm
                        autoFocus
                        initialValue={message}
                        onSubmit = {onCommentUpdate}
                        loading= {updateCommentFn.loading}
                        error={updateCommentFn.error}
                    />)}
				<div className="message">{message}</div>
				<div className="footer">
					<Iconbutton 
                        Icon={likedByMe ? FaHeart: FaRegHeart} 
                        aria-label={likedByMe ? "Unlike" : "Like"}
                        onClick={onToggleCommentLike}
                        disabled={toggleCommentlikeFN.loading}
                    >
						{likeCount}
					</Iconbutton>
					<Iconbutton 
                        Icon={FaReply} 
                        aria-label={isReplying ? "Cancel Reply" : "Reply"}
                        onClick={()=>setIsReplying(prev => !prev)}
                        isActive={isReplying}
                    />
                    {currentUser.id === user.id &&(
                        <>
                            <Iconbutton 
                                Icon={FaEdit} 
                                aria-label={isEditing ? "Cancel Edit" : "Editing"}
                                onClick={()=>setIsEditing(prev => !prev)}
                                isActive={isEditing}
                            />
                            <Iconbutton
                                Icon={FaTrash}
                                disabled={deleteCommentFN?.loading}
                                aria-label="Delete"
                                color="danger"
                                onClick={onCommentDelete}
                            />
                        </>
                    )}
				</div>
                {deleteCommentFN.error && (
                    <div className="error-msg mt-1">{`ERROR DELETING COMMENT: ` +deleteCommentFN.error}</div>
                )}
			</div>

            {/* the textt input box that appears when replying a comment */}
            {isReplying &&(
                <div className="mt-1 ml-3">
                    <CommentForm 
                        autoFocus
                        onSubmit = {onCommentReply}
                        loading = {loading}
                        error ={error}
                    />
                </div>
            )}


            {/* Children comments */}
			{childComments?.length > 0 && (
				<>
					<div
						className={`nested-comments-stack ${
							areChildrenHidden ? " hide " : ""
						}`}
					>
						<button
                            // this is the straight line that appears on a child comment
							aria-label="Hide Replies"
							className="collapse-line"
							onClick={() => setAreChildrenHidden(true)}
						/>
						<div className="nested-comments">
                            {/* the comment itselefu */}
							<Commentlist comments={childComments} />
						</div>
					</div>
					<button
						className={`btn mt-1 ${
							!areChildrenHidden ? "hide" : ""
						}`}
						onClick={() => setAreChildrenHidden(false)}
						style={{ marginTop: "4px" }}
					>
						Show Replies
					</button>
				</>
			)}
		</>
	);
};

export default Comment;
