import React from "react";
import {
    Image,
    Text,
    Heading,
    Flex,
    HStack,
    Stat,
    StatLabel,
    StatNumber,
    StatGroup,
    Divider,
    Tag,
    StatArrow,
    VStack,
} from "@chakra-ui/react"
import { StarIcon, ViewIcon } from "@chakra-ui/icons";

import { Link } from 'react-router-dom'

export const HeadSection = ({ datas, target }) => {
  return (
    <VStack>
      <Link to={target} relative={"path"}>
        <Heading size={"lg"} cursor={"pointer"} textAlign={"center"}>
          {datas.title}
        </Heading>
      </Link>
      <Link to={target} relative={"path"}>
        <Image
          src={datas.images.jpg.image_url}
          _hover={{ transform: "scale(1.01)" }}
          transition={"all 0.5s"}
          borderRadius={5}
          boxShadow={"dark-lg"}
          alt={datas.name}
        />
      </Link>
      <HStack>
        {datas.genres.map((genre) => {
          return (
            <Link to={genre.url} key={genre.name} target={"_blank"}>
              <Tag size={"sm"} variant="solid" colorScheme="teal">
                {genre.name}
              </Tag>
            </Link>
          );
        })}
      </HStack>
      <StatGroup gap={10} textAlign={"center"}>
        <Stat>
          <StatLabel>Score</StatLabel>
          <StatNumber>
            <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
              <StarIcon />
              <Text>{datas.score === null ? "-" : `${datas.score}/`}</Text>
              <Text
                fontSize={"xx-small"}
                opacity={0.5}
                pt={"20px"}
                textAlign={"left"}
              >{` ${datas.scored_by} users`}</Text>
            </Flex>
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Members</StatLabel>
          <StatNumber>
            <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
              <ViewIcon />
              <Text>{datas.members === null ? "-" : datas.members}</Text>
            </Flex>
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Rank</StatLabel>
          <StatNumber>
            <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
              <StatArrow type={datas.rank <= 1000 ? "increase" : "decrease"} />
              <Text>{datas.rank === null ? "-" : datas.rank}</Text>
            </Flex>
          </StatNumber>
        </Stat>
      </StatGroup>
      <Divider />
    </VStack>
  );
};
