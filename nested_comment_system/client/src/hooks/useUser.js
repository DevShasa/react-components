// get the user from the cookie
export function useUser(){
    return {
        id: document.cookie.match(/userId=(?<id>[^;]+);?$/).groups.id
    }
}