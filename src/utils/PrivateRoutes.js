import { useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { auth } from '../firebase/firebase-config'

export const PrivateRoutes = () => {
    const toast = useToast()

    useEffect(() => {
        if (auth.currentUser === null) {
            toast({
                title: "401 Unauthorized",
                status: "error",
                description: "login to use this feature"
            })
        }
    }, [toast])

  return (
    auth.currentUser === null ? <Navigate to={'/login'} /> : <Outlet />  
  )
}
