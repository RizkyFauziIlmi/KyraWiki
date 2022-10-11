import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Image,
  Text,
  Heading,
  VStack,
  Flex,
  HStack,
  Alert,
  AlertIcon,
  TagLabel,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Divider,
  Tag,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  StatArrow,
  UnorderedList,
  ListItem,
  Box,
} from "@chakra-ui/react";
import { StarIcon, ViewIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

export const Anime = () => {
  const [datas, setDatas] = React.useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getAnimeById = async () => {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime/${id}/full`
      );
      setDatas(response.data.data);
    };

    getAnimeById();
  }, [id]);

  const showContent = () => {
    if (datas !== undefined && datas.images !== undefined) {
      return (
        <Flex
          p={5}
          gap={10}
          flexDir={window.innerWidth <= 854 ? "column" : "row"}
        >
          <VStack>
            <Link to={datas.url}>
              <Heading size={"lg"} cursor={"pointer"} textAlign={"center"}>
                {datas.title}
              </Heading>
            </Link>
            <Link to={datas.url}>
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
                    <Text>
                      {datas.score === null ? "-" : `${datas.score}/`}
                    </Text>
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
                    <StatArrow
                      type={datas.rank <= 1000 ? "increase" : "decrease"}
                    />
                    <Text>{datas.rank === null ? "-" : datas.rank}</Text>
                  </Flex>
                </StatNumber>
              </Stat>
            </StatGroup>
            <Divider />
            {window.innerWidth <= 854 ? (
              ""
            ) : (
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
                      return (
                        <a
                          href={value.url}
                          key={value.name}
                        >{`${value.name}, `}</a>
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
                        <a
                          href={value.url}
                          key={value.name}
                        >{`${value.name}, `}</a>
                      );
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
                          <Text
                            fontSize={"xs"}
                          >{`${value.type} : ${value.title}`}</Text>
                        </ListItem>
                      );
                    })}
                  </UnorderedList>
                </Box>
              </>
            )}
          </VStack>
          <Flex flexDir={"column"} width={"100%"}>
            {datas.trailer.url === null ? (
              <Alert status="error" height={"max-content"}>
                <AlertIcon />
                There is no trailer
              </Alert>
            ) : (
              <ReactPlayer
                url={datas.trailer.url}
                loop
                controls
                width={"100%"}
              />
            )}
            <Heading textAlign={"center"} pt={5} size={"md"}>
              Synopsis
            </Heading>
            <Text>
              {datas.synopsis === null
                ? "There is No Sysmopsis"
                : datas.synopsis}
            </Text>
            <Heading textAlign={"center"} pt={5} size={"md"}>
              Background
            </Heading>
            <Text>
              {datas.background === null
                ? "There is No Background"
                : datas.background}
            </Text>
            <TableContainer>
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td>Type</Td>
                    <Td>{datas.type}</Td>
                  </Tr>
                  <Tr>
                    <Td>Source</Td>
                    <Td>{datas.source}</Td>
                  </Tr>
                  <Tr>
                    <Td>Status</Td>
                    <Td>{datas.status}</Td>
                  </Tr>
                  <Tr>
                    <Td>Episode</Td>
                    <Td isNumeric>{datas.episodes}</Td>
                  </Tr>
                  <Tr>
                    <Td>Duration</Td>
                    <Td isNumeric>
                      {datas.duration === null ? "-" : datas.duration}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Aired From</Td>
                    <Td isNumeric>
                      {datas.season === null ? "-" : datas.season}{" "}
                      {new Date(datas.aired.from).getFullYear()}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Studios</Td>
                    <Td>
                      {datas.studios.map((studio) => {
                        return (
                          <Link to={studio.url} key={studio.name}>
                            <Tag
                              size="lg"
                              colorScheme="red"
                              borderRadius="full"
                            >
                              <TagLabel>{studio.name}</TagLabel>
                            </Tag>
                          </Link>
                        );
                      })}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            {window.innerWidth <= 854 ? (
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
                      return (
                        <a
                          href={value.url}
                          key={value.name}
                        >{`${value.name}, `}</a>
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
                        <a
                          href={value.url}
                          key={value.name}
                        >{`${value.name}, `}</a>
                      );
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
                          <Text
                            fontSize={"xs"}
                          >{`${value.type} : ${value.title}`}</Text>
                        </ListItem>
                      );
                    })}
                  </UnorderedList>
                </Box>
              </>
            ) : (
              ""
            )}
            <Heading textAlign={"center"} size={"md"} pt={5}>
              Relations
            </Heading>
            <UnorderedList>
              {datas.relations.map((relation) => {
                return (
                  <ListItem key={relation.relation}>
                    <Text>
                      {`${relation.relation} : `}
                      <Link
                        to={
                          relation.entry[0].type === "anime"
                            ? `../${relation.entry[0].mal_id}`
                            : `../../manga/${relation.entry[0].mal_id}`
                        }
                        relative="path"
                      >
                        <Text>
                          {relation.entry[0].name} (
                          {`${relation.entry[0].type}`})
                        </Text>
                      </Link>
                    </Text>
                  </ListItem>
                );
              })}
            </UnorderedList>
          </Flex>
        </Flex>
      );
    } else {
      const getAnimeById = async () => {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/full`
        );
        setDatas(response.data.data);
      };
      getAnimeById();
    }
  };

  return showContent();
};
