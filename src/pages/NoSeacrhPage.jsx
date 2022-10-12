import { useToast, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'

export const NoSeacrhPage = () => {
    const toast = useToast()

    useEffect(() => {
        toast({
            title: "No Search Keyword",
            description: "please enter keyword",
            status: "error",
            colorScheme: "red"
        })
    }, [toast])

  return (
    <Flex height={'100vh'} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
        <Heading>400 Bad Request</Heading>
        <Text opacity={0.5}>🔎 Input Keyword to Search Something</Text>
    </Flex>
  )
}
