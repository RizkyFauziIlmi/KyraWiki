import { Button, Flex, Heading, Image, Skeleton, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Jumbotron = () => {
  const [datas, setDatas] = React.useState([])
  const [isLoaded, setIsLoaded] = React.useState(false)
  const opacity = useColorModeValue(0.8, 0.5)
  const toast = useToast()

  useEffect(() => {
    const getTopCharacter = async () => {
      await axios.get("https://api.jikan.moe/v4/top/characters?limit=5")
      .then((response) => {
        setDatas(response.data.data)
        setTimeout(() => {
          setIsLoaded(true)
        })
      })
      .catch((error) => {
        toast({
          title: "400 Bad Request",
          status: "error",
          description: error.message
        })
      })
    }

    getTopCharacter()
  }, [toast])

  return (
    <Flex alignItems={"center"} pb={20} textAlign={"center"}>
      <Skeleton isLoaded={isLoaded}>
        <Flex position={"relative"}>
          {datas.map((data, index) => {
            return (
              <Image
                opacity={opacity}
                width={"20vw"}
                src={data.images.jpg.image_url}
                key={index}
              />
            );
          })}
          <Flex
            position={"absolute"}
            alignItems={"center"}
            flexDir={"column"}
            top={"50%"}
            left={"50%"}
            transform={"translate(-50%, -50%)"}
          >
            <Heading size={"lg"}>KYRAWIKI</Heading>
            <Text fontSize={"xs"}>
              Get New Update About Anime and Manga
            </Text>
            <Link to={'/ranking'}>
              <Button colorScheme={"yellow"} size={'xs'}>EXPLORE NOW</Button>
            </Link>
          </Flex>
        </Flex>
      </Skeleton>
    </Flex>
  );
};
