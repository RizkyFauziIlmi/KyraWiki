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
            <Link href={datas.url}>
              <Heading size={"lg"} cursor={"pointer"} textAlign={"center"}>
                {datas.title}
              </Heading>
            </Link>
            <Link href={datas.url}>
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
                  <Link href={genre.url} key={genre.name} target={"_blank"}>
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
                    <Text>{datas.score === null ? "-" : datas.score}</Text>
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
                          <Link href={studio.url} key={studio.name}>
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
