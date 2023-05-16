import React, {useState, useMemo} from "react"
import { useAsync } from "../hooks/useAsync"
import { getPost } from "../services/posts"
import { useParams } from "react-router-dom"

const Context = React.createContext()

export const PostProvider=({children})=>{

    const { id } = useParams()
    const {loading, error, value:post} =useAsync(()=>getPost(id), [id])
    const [comments, setComments] = useState([])

    const commentsByParentId = useMemo(()=>{
        const group = {}
        comments.forEach(comment=>{
            // extract the comments with the parent id
            group[comment.parentId] ||= []
            group[comment.parentId].push(comment)
            
        })

        return group
    }, [comments])

    console.log(post)
    return (<Context.Provider value={{}}>
                {children}
            </Context.Provider>)
}