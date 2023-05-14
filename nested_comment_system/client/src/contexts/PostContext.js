import React from "react"
import { useAsync } from "../hooks/useAsync"
import { getPost } from "../services/posts"
import { useParams } from "react-router-dom"

const Context = React.createContext()

export const PostProvider=({children})=>{

    const { id } = useParams()
    const {loading, error, value:post} =useAsync(()=>getPost(id), [id])


    console.log(post)
    return (<Context.Provider value={{}}>
                {children}
            </Context.Provider>)
}