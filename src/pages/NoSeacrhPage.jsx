import { useToast, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'

export const NoSeacrhPage = () => {
    const toast = useToast()
    const id = 'toast'

    useEffect(() => {
        if (!toast.isActive(id)) {
            toast({
                id,
                title: "No Search Keyword",
                description: "please enter keyword",
                status: "error",
                isClosable: true,
                colorScheme: "red"
            })
        }
    }, [toast])

  return (
    <Flex height={'100vh'} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
        <Heading>400 Bad Request</Heading>
        <Text opacity={0.5}>🔎 Input Keyword to Search Something</Text>
    </Flex>
  )
}
