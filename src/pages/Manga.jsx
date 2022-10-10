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

export const Manga = () => {
  const [datas, setDatas] = React.useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getMangaById = async () => {
      const response = await axios.get(
        `https://api.jikan.moe/v4/manga/${id}/full`
      );
      setDatas(response.data.data);
    };

    getMangaById();
  }, [id]);

  const showContent = () => {
    if (datas !== undefined && datas.images !== undefined) {
      return (
        <Flex
          Flex
          gap={10}
          flexDir={window.innerWidth <= 854 ? "column" : "row"}
          p={5}
        >
          <VStack>
            <Link to={datas.url} target={"_blank"}>
              <Heading size={"lg"} cursor={"pointer"} textAlign={"center"}>
                {datas.title}
              </Heading>
            </Link>
            <Link to={datas.url} target={"_blank"}>
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
                    <Td>Status</Td>
                    <Td>{datas.status}</Td>
                  </Tr>
                  <Tr>
                    <Td>Chapters</Td>
                    <Td>{datas.chapters === null ? "-" : datas.chapters}</Td>
                  </Tr>
                  <Tr>
                    <Td>Volumes</Td>
                    <Td>{datas.volumes === null ? "-" : datas.volumes}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <UnorderedList>
              {datas.relations.map((relation) => {
                return (
                  <ListItem>
                    <Text>
                      {`${relation.relation} : `}
                      <Link
                        to={
                          relation.entry[0].type === "anime"
                            ? `../../anime/${relation.entry[0].mal_id}`
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
                    {console.log(relation)}
                  </ListItem>
                );
              })}
            </UnorderedList>
          </VStack>
        </Flex>
      );
    } else {
      const getMangaById = async () => {
        const response = await axios.get(
          `https://api.jikan.moe/v4/manga/${id}/full`
        );
        setDatas(response.data.data);
      };

      getMangaById();
    }
  };

  return showContent();
};
