// code to demonstrate creating skeleton components for my blog
// Api call that calls ten posts 
// a delay function that delaus for specified seconds
// a component that calls the posts usin useeffect
// useEffect is triggered when reload button is clicked triggering a refetch 
import { useState, useEffect, useCallback } from "react"

// delay for one second
const delay = () => new Promise<void>((res)=> setTimeout(()=> res(), 1000))

// api calls for post
const fetchPosts = async():Promise<[]>=>{
    await delay()
    const response = await fetch(`http://localhost:3500/posts`)
    const data = await response.json()
    return data
}

const Blog = () => {

    const [loading, setLoading ] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState("")


    console.log("HERE IS THE DATA:::", data)

    const fetchData = useCallback(async()=>{
        setLoading(true)
        try {
            const data = await fetchPosts() 
            setData(data)
        } catch (error) {
            console.log("AN ERROR HAS OCCURED", error)
            setError("An error has occcured")
        }finally{
            setLoading(false)
        }
    },[])

    useEffect(()=>{
        fetchData()
    },[fetchData])

    
    let content
    
    if(loading){
        content = <div>Loading</div>
    }else if(error){
        content = <div>{`${error}`}</div>
    }else{
        content = (
            <div>
                kuna content
            </div>
        )
    }

  return content

}

export default Blog