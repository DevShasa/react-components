import {ChangeEvent, useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Input,
  Text,
  Textarea,
  VStack
} from "@chakra-ui/react"
import { useFetch } from '@/hooks/useQuery'


interface Post{
  userId: number | null,
  id: number | null,
  title: string | null,
  body: string | null
}

const Edit = () => {
  
  const router = useRouter()
  const {id} = router.query

  const [post, setPost] = useState<Post>({
    userId: null,
    id: null,
    title: null,
    body: null
  })


  let url

  if(id){
    url = `http://jsonplaceholder.typicode.com/posts/${id}`
  }

  const {data, error, loading} = useFetch<Post>(url)

  const handleChange = (e:ChangeEvent<HTMLInputElement |HTMLTextAreaElement  >) =>{
    setPost((prev) =>{
        return {...prev, [e.target.name]: [e.target.value]}
    })
  }


  useEffect(()=>{
    if(data){
      setPost(data)
    }
  },[data])


  return (
    <Box maxW={'800px'} m={'0 auto'} w={'100%'}>
        <Button onClick={()=> router.push("/")}>{` < `}</Button>
        <Card p={6} color="gray.400">
          <Box>
                {loading && (
                  <CircularProgress 
                    size="1.5rem"
                    isIndeterminate
                    color='blue.300'
                    mb={5}
                  />
                )}

                {error && <Text color="red.300">There was an error</Text>}

                {data && (
                  <VStack spacing={3} alignItems={'flex-start'}>
                      <Text>Title</Text>
                      <Input name="title" value={post?.title || ""} onChange={(e)=> handleChange(e)}/>
                      <Text>body</Text>
                      <Textarea 
                        rows={10}
                        name="body"
                        value={post?.body || ""}
                        onChange={(e)=> handleChange(e)}
                      />
                  </VStack>
                )}
                
          </Box>
        </Card>
    </Box>
  )
}

export default Edit