import React from "react";
import {
  Text,
  Heading,
  HStack,
  Tag,
  UnorderedList,
  ListItem,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const OtherSection = ({ datas }) => {
  return (
    <>
      <Heading textAlign={"center"} size={"md"} pt={5}>
        Others
      </Heading>
      <Box textAlign={"left"}>
        <Heading size={"sm"} pt={2}>
          Rating :{" "}
        </Heading>
        <Text>{datas.rating}</Text>
        <Heading size={"sm"} pt={2}>
          Watch Now :{" "}
        </Heading>
        <Text>
          {datas.streaming.map((value) => {
            return <a href={value.url} key={value.name}>{`${value.name}, `}</a>;
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
            return <a href={value.url} key={value.name}>{`${value.name}, `}</a>;
          })}
        </Text>
        <Heading size={"sm"} pt={2}>
          Themes :{" "}
        </Heading>
        <HStack spacing={2}>
          {datas.themes.map((value) => {
            return (
              <Link to={value.url} key={value.name} target={"_blank"}>
                <Tag size={"sm"} variant="solid" colorScheme="teal">
                  {value.name}
                </Tag>
              </Link>
            );
          })}
        </HStack>
        <Heading size={"sm"} pt={2}>
          Demographics :{" "}
        </Heading>
        <HStack spacing={2}>
          {datas.demographics.map((value) => {
            return (
              <Link to={value.url} key={value.name} target={"_blank"}>
                <Tag size={"sm"} variant="solid" colorScheme="teal">
                  {value.name}
                </Tag>
              </Link>
            );
          })}
        </HStack>
        <Heading size={"sm"} pt={2}>
          Theme :
        </Heading>
        <Heading size={"xs"}>Openings</Heading>
        <UnorderedList>
          {datas.theme.openings.map((value) => {
            return (
              <ListItem fontSize={"xs"} key={value}>
                {value}
              </ListItem>
            );
          })}
        </UnorderedList>
        <Heading size={"xs"}>Endings</Heading>
        <UnorderedList>
          {datas.theme.endings.map((value) => {
            return (
              <ListItem fontSize={"xs"} key={value}>
                {value}
              </ListItem>
            );
          })}
        </UnorderedList>
        <Heading size={"xs"} pt={2}>
          Alternative Title :{" "}
        </Heading>
        <UnorderedList>
          {datas.titles.map((value) => {
            return (
              <ListItem key={value.title}>
                <Text fontSize={"xs"}>{`${value.type} : ${value.title}`}</Text>
              </ListItem>
            );
          })}
        </UnorderedList>
      </Box>
    </>
  );
};
