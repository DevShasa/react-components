import { usePost } from "../contexts/PostContext"
import Commentlist from "./Commentlist"
import CommentForm from "./CommentForm"
import { useAsyncFn } from "../hooks/useAsync"
import { createComment } from "../services/comment"

export function Post(){

    const { loading, error, execute } = useAsyncFn(createComment)



    const { post, rootComments } = usePost()

    function onCommentCreate(message){
        return execute({postId: post.id, message}).then((comment =>{
            console.log("YOU HAVE CREATED",comment) // response from server
        })
        )
    }
    return (
        <>
            <h1>{post.title}</h1>
            <article>{post.body}</article>
            <h3 className="comments-title">Comments</h3>
            <section>
                <CommentForm
                    error={error}
                    loading = {loading}
                    onSubmit = {onCommentCreate}
                />
                {rootComments !== null && rootComments?.length !== 0  &&(
                    <div className="mt-4">
                        <Commentlist comments={rootComments}/>
                    </div>
                )}
            </section>
        </>
    )
}