import {
  Flex,
  Text,
  Heading,
  Avatar,
  Skeleton,
  SkeletonText,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiTwotoneCrown,
} from "react-icons/ai";

export const Ranking = ({ datas, isLoaded }) => {
    const width = useBreakpointValue(
        {
            base: "80vw",
            md: " 40vw"
        },
        {
            fallback: "md"
        }
    )

    const avatarWidth = useBreakpointValue(
        {
            base: "md",
            md: "xl"
        },
        {
            fallback: "md"
        }
    )
  return (
    <Flex flexDir={"column"} gap={1} overflow={"hidden"}>
      <Heading textAlign={"center"} mt={20} mb={10}>
        Anime Ranking
      </Heading>
      {datas.map((data, index) => {
        return (
          <Flex p={5} gap={10} justifyContent={"center"} alignItems={"center"}>
            <SkeletonText isLoaded={isLoaded}>
              <Heading size={"md"}>
                {index + 1 === 1 ? (
                  <Flex alignItems={"center"} flexDir={"column"}>
                    <AiTwotoneCrown />
                    <Text>{index + 1}</Text>
                  </Flex>
                ) : index + 1 > 1 && index + 1 <= 10 ? (
                  <Flex alignItems={"center"} flexDir={"column"}>
                    <AiOutlineArrowUp />
                    <Text>{index + 1}</Text>
                  </Flex>
                ) : (
                  <Flex alignItems={"center"} flexDir={"column"}>
                    <AiOutlineArrowDown />
                    <Text>{index + 1}</Text>
                  </Flex>
                )}
              </Heading>
            </SkeletonText>
            <Link to={`../anime/${data.mal_id}`} relative="path">
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
                    overflowX={'auto'}
                  >
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Avatar
                        size={avatarWidth}
                        name={data.title}
                        src={data.images.jpg.image_url}
                      />
                    </motion.div>
                    <Text fontWeight={"bold"} fontSize={'sm'}>{data.title}</Text>
                    <Flex alignItems={"center"}>
                      <Text fontWeight={"bold"} fontSize={"md"}>
                        {data.score === null ? "-" : `${data.score}/`}
                      </Text>
                      <Text
                        fontSize={"xx-small"}
                        opacity={0.5}
                        pt={"20px"}
                        textAlign={"left"}
                      >{` ${data.scored_by} users`}</Text>
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
