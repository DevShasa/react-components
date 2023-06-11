import axios from "axios"


const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true // this makes the cookies passed into the request
})

export function makeRequest(url, options){
    // return an axios promise
    return api(url, options)
                .then(res=> res.data)
                .catch(error=>{
                    console.log("IKO CHINDA MANGAI")
                    return Promise.reject(error?.response?.data?.message ?? "Error") 
                })
}