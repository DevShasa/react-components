import {
  Box,
  Button,
  Card,
  CircularProgress,
  Heading,
  Text,
  VStack
} from '@chakra-ui/react'
import { useFetch } from '@/hooks/useQuery'
import { useRouter } from 'next/router'

const url = `http://jsonplaceholder.typicode.com/posts`

interface Post {
  userId: number,
  id: number,
  title: string,
  body: string
}

const PostHome = () =>{
  const {data, error, loading} = useFetch<Post[]>(url)

  const router = useRouter()



  return(
    <Box>
      <Heading mb={5}>Posts</Heading>

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
        <VStack spacing={4} maxW="30rem" m="0 auto">
          {data.map((postItem)=>{
            const {id, title, body} = postItem
            return (
              <Card key={id} maxW="inherit" textAlign="left" p={8}>
                  <Text fontSize="lg" mb={5} fontWeight={"bold"}>{title}</Text>
                  <Text overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'} mb={5}>
                    {body}
                  </Text>
                  <Button onClick={()=>{
                    router.push(`/posts/${id}/edit`)
                  }}>
                    Edit
                  </Button>
              </Card>
            )
          })}
        </VStack>
      )}

    </Box>
  )
}

export default PostHome