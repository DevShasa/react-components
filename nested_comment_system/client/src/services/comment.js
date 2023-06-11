import { makeRequest } from "./makeRequest";

// pass in createcomment to useAsyncFn(createcomment)
// ... the execute will then return a function that when called like 
// ...execute({postId: post.id, message}) willexecute createcomment while updating value error and delete 
// basicaly execute takes in a function and then returns a new function that when called will execute
// ... the original function while updating value, error ,delete 
export function createComment({postId, message, parentId}){
    return makeRequest(`posts/${postId}/comments`,{
        method:"POST",
        data:{message, parentId}
    } )
}

export function updateComment({postId, message, id}){
    return makeRequest(`posts/${postId}/comments/${id}`, {
        method:"PUT",
        data:{message},
    })
}


export function deleteComment({postid, id}){
    return makeRequest(`posts/${postid}/comments/${id}`, {
        method:"DELETE",
    })
}

export function toggleCommentLike({id, postId}){
    return makeRequest(`posts/${postId}/comments/${id}/toggleLike`, {
        method:"POST",
    })
}