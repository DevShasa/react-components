import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraBaseProvider, extendTheme, Box } from '@chakra-ui/react'

const theme = extendTheme({
  config:{
    initialColorMode: "dark",
    useSystemColorMode: false
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraBaseProvider theme={theme}>
      <Box textAlign="center" maxW={700} m="3rem auto">
        <Component {...pageProps} />
      </Box>
    </ChakraBaseProvider>
  )
}
