import { baseUrl, delay, usersEdnpoint } from "../utils";


export const getUsers = async ()=>{
    await delay()
    const response  = await fetch(`${baseUrl}${usersEdnpoint}`)
    const data = await response.json()

    return data
}

export const getUserById = async (usersEndpoint:string, userId:number)=>{
    await delay()
    const response  = await fetch(`${baseUrl}${usersEndpoint}/${userId}`)
    const data = await response.json()

    return data
}