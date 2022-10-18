import { Flex, Heading, Text, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";

export const NotFoundPage = () => {
    const toast = useToast()
    const id = 'toast'

    useEffect(() => {
        if (!toast.isActive(id)) {
            toast({
                id,
                title: "Not Page Found",
                description: "please visit valid url",
                status: "error",
                isClosable: true,
                colorScheme: "red"
            })
        }
    }, [toast])

  return (
    <Flex
      height={"100vh"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Heading>404 Not Found</Heading>
      <Text opacity={0.5}>⚠️ Page Not Found</Text>
    </Flex>
  );
};
