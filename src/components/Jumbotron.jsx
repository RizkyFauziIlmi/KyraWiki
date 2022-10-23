import { Button, Flex, Heading, Image, Skeleton, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Jumbotron = () => {
  const [datas, setDatas] = React.useState([])
  const [isLoaded, setIsLoaded] = React.useState(false)

  const getTopCharacter = async () => {
    await axios.get("https://api.jikan.moe/v4/top/characters?limit=5")
    .then((response) => {
      setDatas(response.data.data)
      setTimeout(() => {
        setIsLoaded(true)
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getTopCharacter()
  }, [])

  return (
    <Flex alignItems={"center"} pb={20}>
      <Skeleton isLoaded={isLoaded}>
        <Flex position={"relative"}>
          {datas.map((data, index) => {
            return (
              <Image
                opacity={0.2}
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
            <Heading size={"2xl"}>KYRAWIKI</Heading>
            <Text fontSize={"sm"} opacity={0.8}>
              Get New Update About Anime and Manga
            </Text>
            <Link to={'/ranking'}>
              <Button colorScheme={"yellow"}>EXPLORE NOW</Button>
            </Link>
          </Flex>
        </Flex>
      </Skeleton>
    </Flex>
  );
};
