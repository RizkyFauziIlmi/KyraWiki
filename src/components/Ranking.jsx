import {
  Flex,
  Text,
  Heading,
  Avatar,
  Skeleton,
  SkeletonText,
  useBreakpointValue,
  StatUpArrow,
  StatDownArrow,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiTwotoneCrown,
  AiTwotoneLike,
} from "react-icons/ai";
import { useEffect } from "react";
import axios from "axios";

export const Ranking = ({ category = "" }) => {
  const relation = ["anime", "manga", "characters", "people"];
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [datas, setDatas] = React.useState([])
  const [isLoaded, setIsLoaded] = React.useState(false)

  useEffect(() => {
    setIsLoaded(false)
    const getTop = async () => {
      await axios.get(
        `https://api.jikan.moe/v4/top/${category}`
      )
        .then((response) => {
          setDatas(response.data.data);
          setTimeout(() => {
            setIsLoaded(true)
          })
        })
        .catch((error) => {
          console.log(error)
        })
    };

    getTop()
  }, [category])

  const width = useBreakpointValue(
    {
      base: "70vw",
      md: " 40vw",
    },
    {
      fallback: "md",
    }
  );

  const avatarWidth = useBreakpointValue(
    {
      base: "md",
      md: "xl",
    },
    {
      fallback: "md",
    }
  );

  const gap = useBreakpointValue(
    {
      base: 5,
      md: 10,
    },
    {
      fallback: "md",
    }
  );
  const fontSize = useBreakpointValue(
    {
      base: "xx-small",
      md: "lg",
    },
    {
      fallback: "md",
    }
  );

  const backIndex = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const fowardIndex = () => {
    if (currentIndex < 3 && currentIndex >= 0) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <Flex flexDir={"column"} gap={1} overflow={"hidden"}>
      <Heading textAlign={"center"} mt={20} mb={10}>
        {category.charAt(0).toUpperCase() + category.slice(1) + " Ranking"}
      </Heading>
      <Flex justifyContent={"center"} alignItems={"center"} gap={4}>
        <Link
          to={`../${
            relation[currentIndex > 0 ? currentIndex - 1 : currentIndex]
          }`}
          relative="path"
          onClick={backIndex}
        >
          <motion.div whileHover={{ scale: 1.5 }}>
            <AiOutlineArrowLeft />
          </motion.div>
        </Link>
        {relation.map((value, index) => {
          if (value === category) {
            return (
              <Text fontWeight={"bold"} as={"u"} fontSize={'sm'}>
                {value.toUpperCase()}
              </Text>
            );
          } else {
            return (
              <Link
                to={`../${value}`}
                relative="path"
                onClick={() => setCurrentIndex(index)}
              >
                <motion.div whileHover={{ scale: 1.2 }}>
                  <Text fontSize={'sm'}>{value}</Text>
                </motion.div>
              </Link>
            );
          }
        })}
        <Link
          to={`../${
            relation[
              currentIndex >= 0 && currentIndex < 3
                ? currentIndex + 1
                : currentIndex
            ]
          }`}
          relative="path"
          onClick={fowardIndex}
        >
          <AiOutlineArrowRight />
        </Link>
      </Flex>
      {datas.map((data, index) => {
        return (
          <Flex
            p={5}
            gap={gap}
            key={index}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <SkeletonText isLoaded={isLoaded}>
              <Heading size={"md"}>
                {index + 1 === 1 ? (
                  <Flex alignItems={"center"} flexDir={"column"}>
                    <AiTwotoneCrown color="yellow"/>
                    <Text>{index + 1}</Text>
                  </Flex>
                ) : index + 1 > 1 && index + 1 <= 10 ? (
                  <Flex alignItems={"center"} flexDir={"column"}>
                    <StatUpArrow />
                    <Text>{index + 1}</Text>
                  </Flex>
                ) : (
                  <Flex alignItems={"center"} flexDir={"column"}>
                    <StatDownArrow />
                    <Text>{index + 1}</Text>
                  </Flex>
                )}
              </Heading>
            </SkeletonText>
            <Link
              to={
                category === "characters"
                  ? `../../character/${data.mal_id}`
                  : `../../${category}/${data.mal_id}`
              }
              relative="path"
            >
              <motion.div whileHover={{ scale: 1.05 }}>
                <Skeleton isLoaded={isLoaded}>
                  <Flex
                    borderRadius={"10px"}
                    boxShadow={"dark-lg"}
                    gap={10}
                    width={width}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    p={5}
                    overflowX={"auto"}
                  >
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Avatar
                        size={avatarWidth}
                        name={
                          category === "characters" || category === "people"
                            ? data.name
                            : data.title
                        }
                        src={data.images.jpg.image_url}
                      />
                    </motion.div>
                    <Text
                      fontWeight={"bold"}
                      fontSize={fontSize}
                      textAlign={"left"}
                    >
                      {category === "characters" || category === "people"
                        ? data.name
                        : data.title}
                    </Text>
                    <Flex alignItems={"center"}>
                      {category === "characters" || category === "people" ? (
                        <>
                          <AiTwotoneLike />
                          <Text>{data.favorites}</Text>
                        </>
                      ) : (
                        <>
                          <Text fontWeight={"bold"} fontSize={"sm"}>
                            {data.score === null ? "-" : `${data.score}/`}
                          </Text>
                          <Text
                            fontSize={"xx-small"}
                            opacity={0.5}
                            pt={"20px"}
                            textAlign={"left"}
                          >{` ${data.scored_by} users`}</Text>
                        </>
                      )}
                    </Flex>
                  </Flex>
                </Skeleton>
              </motion.div>
            </Link>
          </Flex>
        );
      })}
    </Flex>
  );
};
