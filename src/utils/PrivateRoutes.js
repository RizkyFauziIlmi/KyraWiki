import { useToast } from '@chakra-ui/react'
import { onAuthStateChanged } from 'firebase/auth'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { auth } from '../firebase/firebase-config'

export const PrivateRoutes = () => {
  const toast = useToast()
  const navigate = useNavigate()

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate('/login')
      toast({
        title: "401 Unauthorized",
        status: "warning",
        description: "login to use this feature",
        isClosable: true
      })
    } 
  })
  
return(
  <Outlet />
)
}
