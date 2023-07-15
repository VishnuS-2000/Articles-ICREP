import '../styles/globals.css'
import NotificationProvider from '../context/NotificationProvider'


import { ChakraProvider } from '@chakra-ui/react'
import AuthProvider from '../context/AuthProvider'
function MyApp({ Component, pageProps }) {


  return <ChakraProvider>
        <NotificationProvider>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
    </NotificationProvider>
  </ChakraProvider> 
}

export default MyApp
