// Await will resolve after one second 
const delay = () => new Promise<void>((res) => setTimeout(() => res(), 1800));

const baseUrl = "http://localhost:3500"
const postsEndpoint = `/posts`
const usersEdnpoint = "/users"

export {delay, baseUrl, postsEndpoint, usersEdnpoint}