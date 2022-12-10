import '../styles/globals.css'
import NotificationProvider from '../context/NotificationProvider'


import { ChakraProvider } from '@chakra-ui/react'
import AuthProvider from '../context/AuthProvider'

function MyApp({ Component, pageProps }) {
  return <ChakraProvider>
    <AuthProvider>
      <NotificationProvider>
      <Component {...pageProps} />
      </NotificationProvider>
    </AuthProvider>
  </ChakraProvider> 
}

export default MyApp
