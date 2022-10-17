import React from "react";
import {
  Image,
  Text,
  Heading,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Divider,
  Tag,
  StatArrow,
  VStack,
  Grid,
  GridItem,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { StarIcon, ViewIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";

export const HeadSection = ({ datas, target, isLoaded }) => {
  return (
    <VStack overflow={"hidden"}>
      <Link to={target} relative={"path"}>
        <SkeletonText noOfLines={2} isLoaded={isLoaded}>
          <Heading size={"lg"} cursor={"pointer"} textAlign={"center"}>
            {datas.title}
          </Heading>
        </SkeletonText>
      </Link>
      <Link to={target} relative={"path"}>
        <Skeleton isLoaded={isLoaded}>
          <Image
            src={datas.images.jpg.image_url}
            _hover={{ transform: "scale(1.01)" }}
            transition={"all 0.5s"}
            borderRadius={5}
            boxShadow={"dark-lg"}
            alt={datas.name}
          />
        </Skeleton>
      </Link>
      <Grid autoFlow={"column"} gap={0.5} alignItems={"center"}>
        {datas.genres.map((genre) => {
          return (
            <GridItem key={genre.name}>
              <Link to={genre.url} target={"_blank"}>
                <Skeleton isLoaded={isLoaded}>
                  <Tag size={"sm"} variant="solid" colorScheme="teal">
                    {genre.name}
                  </Tag>
                </Skeleton>
              </Link>
            </GridItem>
          );
        })}
      </Grid>
      <StatGroup gap={10} textAlign={"center"}>
        <Stat>
          <SkeletonText noOfLines={1} isLoaded={isLoaded}>
            <StatLabel>Score</StatLabel>
          </SkeletonText>
          <StatNumber>
            <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
              <Skeleton isLoaded={isLoaded}>
                <StarIcon />
              </Skeleton>
              <SkeletonText isLoaded={isLoaded} noOfLines={2}>
                <Text>{datas.score === null ? "-" : `${datas.score}/`}</Text>
              </SkeletonText>
              <SkeletonText noOfLines={1} isLoaded={isLoaded}>
                <Text
                  fontSize={"xx-small"}
                  opacity={0.5}
                  pt={"20px"}
                  textAlign={"left"}
                >{` ${datas.scored_by} users`}</Text>
              </SkeletonText>
            </Flex>
          </StatNumber>
        </Stat>
        <Stat>
          <SkeletonText noOfLines={1} isLoaded={isLoaded}>
            <StatLabel>Members</StatLabel>
          </SkeletonText>
          <StatNumber>
            <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
              <Skeleton isLoaded={isLoaded}>
                <ViewIcon />
              </Skeleton>
              <SkeletonText noOfLines={2} isLoaded={isLoaded}>
                <Text>{datas.members === null ? "-" : datas.members}</Text>
              </SkeletonText>
            </Flex>
          </StatNumber>
        </Stat>
        <Stat>
          <SkeletonText noOfLines={1} isLoaded={isLoaded}>
            <StatLabel>Rank</StatLabel>
          </SkeletonText>
          <StatNumber>
            <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
              <Skeleton isLoaded={isLoaded}>
                <StatArrow
                  type={datas.rank <= 1000 ? "increase" : "decrease"}
                />
              </Skeleton>
              <SkeletonText isLoaded={isLoaded} noOfLines={2}>
                <Text>{datas.rank === null ? "-" : datas.rank}</Text>
              </SkeletonText>
            </Flex>
          </StatNumber>
        </Stat>
      </StatGroup>
      <Divider />
    </VStack>
  );
};
