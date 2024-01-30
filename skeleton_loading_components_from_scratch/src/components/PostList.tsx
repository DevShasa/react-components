import useSWR from "swr";
import { getUserById } from "../api/usersApi";
import { getPostbyUserId } from "../api/postsApi";
import { postsEndpoint, usersEdnpoint } from "../utils";
import Post from "./Post";
import { Post as Ipost } from "../globaltypes";

interface IpostList{
    currentUserId: number
}

const PostList = (props:IpostList) => {
    const { currentUserId } = props
    const {isLoading, error, data:posts} = useSWR([postsEndpoint, currentUserId], ([url, userId])=>getPostbyUserId(url, userId))
    const {isLoading:isLoadingUser, error:userError, data:user} = useSWR(
        posts?.length ? [usersEdnpoint, currentUserId] : null ,
        ([url, userId]) => getUserById(url, userId)
    )

    let content
    if(currentUserId === 0){
        content = <p className="loading">Select an employee to view posts</p>
    }else if(isLoading || isLoadingUser){
        content = ([...Array(10).keys()].map(i=>(<p key={i}>Loading</p>)))
    }else if(error || userError){
        content = <p>{error.message || userError.message}</p>
    }else{
        content = (
            <main>
                {posts.map((post:Ipost) =>(<Post key={post.id} post={post} user={user}/>))}
            </main>
        )
    }

    return content
}

export default PostList