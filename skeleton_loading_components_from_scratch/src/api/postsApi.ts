
import { delay, baseUrl } from "../utils"


export const getPostbyUserId = async(postEndpoint:string, userId:number)=>{
    await delay()

    const respose = await fetch(`${baseUrl}${postEndpoint}?userId=${userId}`)
    const data = await respose.json()

    return data
}
