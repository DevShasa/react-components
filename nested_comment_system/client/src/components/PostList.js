import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getPosts } from "../services/posts"
import { useAsync } from "../hooks/useAsync"

export function PostList(){
    const { loading, error, value: posts } = useAsync(getPosts)

    if(loading) return <h1>...Loading</h1>
    if(error) return <h2 className="error.msg">{error}</h2>

    return posts?.map(post =>{
        return(
            <h1 key={post.id}>
                <Link to={`/posts/${post.id}`}>
                    {post.title}
                </Link>
            </h1>
        )
    })
}