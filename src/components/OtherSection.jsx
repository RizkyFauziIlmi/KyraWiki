import React from "react";
import {
  Text,
  Heading,
  HStack,
  Tag,
  UnorderedList,
  ListItem,
  Box,
  SkeletonText,
  Skeleton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const OtherSection = ({ datas, isLoaded }) => {
  return (
    <>
      <Skeleton mt={4} isLoaded={isLoaded}>
        <Heading textAlign={"center"} size={"md"} pt={5}>
          Others
        </Heading>
      </Skeleton>
      <Box textAlign={"left"}>
        <SkeletonText noOfLines={10} isLoaded={isLoaded}>
          <Heading size={"sm"} pt={2}>
            Rating :{" "}
          </Heading>
          <Text>{datas.rating}</Text>
          <Heading size={"sm"} pt={2}>
            Watch Now :{" "}
          </Heading>
          <Text>
            {datas.streaming.map((value) => {
              return (
                <a href={value.url} key={value.name}>{`${value.name}, `}</a>
              );
            })}
          </Text>
          <Heading size={"sm"} pt={2}>
            Broadcast :{" "}
          </Heading>
          <Text>{datas.broadcast.string}</Text>
          <Heading size={"sm"} pt={2}>
            Source :{" "}
          </Heading>
          <Text>
            {datas.external.map((value) => {
              return (
                <a href={value.url} key={value.name}>{`${value.name}, `}</a>
              );
            })}
          </Text>
        </SkeletonText>
        <Skeleton isLoaded={isLoaded} mt={2}>
          <Heading size={"sm"} pt={2}>
            Themes :{" "}
          </Heading>
        </Skeleton>
        <HStack spacing={2}>
          {datas.themes.map((value) => {
            return (
              <Link to={value.url} key={value.name} target={"_blank"}>
                <Skeleton mt={1} isLoaded={isLoaded}>
                  <Tag size={"sm"} variant="solid" colorScheme="teal">
                    {value.name}
                  </Tag>
                </Skeleton>
              </Link>
            );
          })}
        </HStack>
        <Skeleton isLoaded={isLoaded} mt={2}>
          <Heading size={"sm"} pt={2}>
            Demographics :{" "}
          </Heading>
        </Skeleton>
        <HStack spacing={2}>
          {datas.demographics.map((value) => {
            return (
              <Link to={value.url} key={value.name} target={"_blank"}>
                <Skeleton isLoaded={isLoaded} mt={1}>
                  <Tag size={"sm"} variant="solid" colorScheme="teal">
                    {value.name}
                  </Tag>
                </Skeleton>
              </Link>
            );
          })}
        </HStack>
        <Skeleton isLoaded={isLoaded} mt={2}>
          <Heading size={"sm"} pt={2}>
            Theme :
          </Heading>
        </Skeleton>
        <Skeleton isLoaded={isLoaded} mt={1}>
          <Heading size={"xs"}>Openings</Heading>
        </Skeleton>
        <UnorderedList>
          {datas.theme.openings.map((value) => {
            return (
              <SkeletonText
                isLoaded={isLoaded}
                mt={1}
                noOfLines={1}
                key={value}
                mb={0.5}
              >
                <ListItem fontSize={"xs"}>{value}</ListItem>
              </SkeletonText>
            );
          })}
        </UnorderedList>
        <Skeleton isLoaded={isLoaded} mt={1}>
          <Heading size={"xs"}>Endings</Heading>
        </Skeleton>
        <UnorderedList>
          {datas.theme.endings.map((value) => {
            return (
              <SkeletonText
                isLoaded={isLoaded}
                mt={1}
                noOfLines={1}
                key={value}
              >
                <ListItem fontSize={"xs"}>{value}</ListItem>
              </SkeletonText>
            );
          })}
        </UnorderedList>
        <Skeleton isLoaded={isLoaded} mt={2}>
          <Heading size={"xs"} pt={2}>
            Alternative Title :{" "}
          </Heading>
        </Skeleton>
        <UnorderedList>
          {datas.titles.map((value) => {
            return (
              <SkeletonText mt={1} noOfLines={1} isLoaded={isLoaded} key={value.title}>
                <ListItem>
                  <Text
                    fontSize={"xs"}
                  >{`${value.type} : ${value.title}`}</Text>
                </ListItem>
              </SkeletonText>
            );
          })}
        </UnorderedList>
      </Box>
    </>
  );
};
