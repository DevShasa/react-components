import axios from "axios"


const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true // this makes the cookies passed into the request
})

export function makeRequest(url, options){
    return api(url, options)
                .then(res=> res.data)
                .catch(error=>{
                    // this is how the error is structured on the client
                    Promise.reject(error?.response?.data?.message ?? "Error") 
                })
}