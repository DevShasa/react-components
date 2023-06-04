import React, {useState, useMemo, useContext, useEffect} from "react"
import { useAsync } from "../hooks/useAsync"
import { getPost } from "../services/posts"
import { useParams } from "react-router-dom"

const Context = React.createContext()

export function usePost(){
    return useContext(Context)
}

export const PostProvider=({children})=>{

    const { id } = useParams()
    const {loading, error, value:post} =useAsync(()=>getPost(id), [id])
    const [comments, setComments] = useState([])

    const commentsByParentId = useMemo(()=>{
        const group = {}
        comments?.forEach(comment=>{
            // extract the comments with the parent id
            // group[comment.parentId] ||= []
            // group[comment.parentId].push(comment)

            if(group[comment.parentId]){
                // the parent id key exists, add all comments for that parent id 
                group[comment.parentId].push(comment)
            } else{
                // parent id key does not existt lets add it
                group[comment.parentId] = []
                group[comment.parentId].push(comment)
            }

        })

        return group
    }, [comments])

    useEffect(()=>{
        if(post?.comments === null) return
        setComments(post?.comments)
    },[post?.comments])
    

    function getRepliesToComment(parentId){
        return commentsByParentId[parentId]
    }

    function createLocalComment(comment){
        setComments(prev=>{
            return [...comment, prev]
        })
    }

    function updateLocalComment(id, message){
        setComments(prevComments =>{
            return prevComments.map(comment =>{
                if(comment.id === id){
                    return {...comment, message}
                }else{
                    return comment
                }
            })
        })
    }

    function deleteLocalComment(id){
        setComments(prevComments =>{
            return prevComments.filter(comment => comment.id !== id)
        })
    }

    function toggleLocalCommentLike(id, addLike){
        setComments(prev =>{
            return prev.map(comment =>{
                if(id === comment.id){
                    // this is the comment we want to update

                }else{
                    return comment
                }
            })
        })
    }


    console.log("COMMENTS AND PARENTS",commentsByParentId)
    return (
    <Context.Provider value={{
        post: {id, ...post}, // adding the id because in the server we dont send it 
        rootComments: commentsByParentId[null],
        getRepliesToComment,
        createLocalComment,
        updateLocalComment,
        deleteLocalComment,
        toggleLocalCommentLike
    }}>
        {loading 
            ? (<h1>Loading</h1>)
            : error
            ? <h1 className="error-msg">{error}</h1>
            : children
        }
    </Context.Provider>)
}