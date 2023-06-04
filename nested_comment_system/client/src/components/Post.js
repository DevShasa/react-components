import { usePost } from "../contexts/PostContext"
import Commentlist from "./Commentlist"


export function Post(){

    const { post, rootComments } = usePost()
    return (
        <>
            <h1>{post.title}</h1>
            <article>{post.body}</article>
            <h3 className="comments-title">Comments</h3>
            <section>
                {rootComments !== null && rootComments.length !== 0  &&(
                    <div className="mt-4">
                        <Commentlist comments={rootComments}/>
                    </div>
                )}
            </section>
        </>
    )
}