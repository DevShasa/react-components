import { useState } from 'react'
import Header from './components/Header'
import PostList from './components/PostList'

function App() {
  const [currentUserId, setCurrentUserId] = useState(0)
  return (
    <>
      <Header currentUserId={currentUserId} setCurrentUserId={setCurrentUserId}/>
      <PostList currentUserId={currentUserId} />
    </>
  )
}

export default App
