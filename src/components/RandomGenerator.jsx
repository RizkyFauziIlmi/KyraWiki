import React from "react";
import {
  Button,
  Image,
  Text,
  Heading,
  Link,
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
  Select,
  StatArrow,
  Avatar,
} from "@chakra-ui/react";
import ReactPlayer from "react-player/youtube";
import { StarIcon, ViewIcon } from "@chakra-ui/icons";
import { FaHeart } from "react-icons/fa";

export const RandomGenerator = () => {
  const [datas, setDatas] = React.useState();
  const [query, setQuery] = React.useState("anime");

  const getRandomAnime = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/random/${query}`);
    const resData = await res.json();
    setDatas(resData.data);
  };

  const changeValueOption = () => {
    const select = document.getElementById("select");
    const value = select.options[select.selectedIndex].value;
    setQuery(value);
    getRandomAnime()
  };

  const showContent = () => {
    if (query === "anime") {
      if (datas !== undefined && datas.trailer !== undefined) {
        return (
          <Flex gap={10} flexDir={window.innerWidth <= 854 ? "column" : "row"}>
            <VStack>
              <Link href={datas.url} target={"_blank"}>
                <Heading size={"md"} cursor={"pointer"} textAlign={"center"}>
                  {datas.title}
                </Heading>
              </Link>
              <Link href={`/anime/${datas.mal_id}`}>
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
                    <Flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      gap={2}
                    >
                      <StarIcon />
                      <Text>{datas.score === null ? "-" : datas.score}</Text>
                    </Flex>
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Members</StatLabel>
                  <StatNumber>
                    <Flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      gap={2}
                    >
                      <ViewIcon />
                      <Text>
                        {datas.members === null ? "-" : datas.members}
                      </Text>
                    </Flex>
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Rank</StatLabel>
                  <StatNumber>
                    <Flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      gap={2}
                    >
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
              <Text>{datas.synopsis}</Text>
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
                        {datas.season === null ? "" : datas.season}{" "}
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
            </Flex>
          </Flex>
        );
      }
    } else if (query === "manga") {
      if (datas !== undefined && datas.genres !== undefined) {
        return (
          <Flex
            Flex
            gap={10}
            flexDir={window.innerWidth <= 854 ? "column" : "row"}
          >
            <VStack>
              <Link href={datas.url} target={"_blank"}>
                <Heading size={"md"} cursor={"pointer"} textAlign={"center"}>
                  {datas.title}
                </Heading>
              </Link>
              <Link href={datas.url} target={"_blank"}>
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
                    <Flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      gap={2}
                    >
                      <StarIcon />
                      <Text>{datas.score === null ? "-" : datas.score}</Text>
                    </Flex>
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Members</StatLabel>
                  <StatNumber>
                    <Flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      gap={2}
                    >
                      <ViewIcon />
                      <Text>
                        {datas.members === null ? "-" : datas.members}
                      </Text>
                    </Flex>
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Rank</StatLabel>
                  <StatNumber>
                    <Flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      gap={2}
                    >
                      <StatArrow
                        type={datas.rank <= 1000 ? "increase" : "decrease"}
                      />
                      <Text>{datas.rank === null ? "-" : datas.rank}</Text>
                    </Flex>
                  </StatNumber>
                </Stat>
              </StatGroup>
              <Divider />
              <Text>{datas.synopsis}</Text>
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
            </VStack>
          </Flex>
        );
      }
    } else if (query === "characters") {
      if (datas !== undefined) {
        return (
          <Flex
            Flex
            gap={10}
            flexDir={window.innerWidth <= 854 ? "column" : "row"}
          >
            <VStack>
              <Link href={datas.url} target={"_blank"}>
                <Heading size={"md"} cursor={"pointer"} textAlign={"center"}>
                  {datas.name}
                </Heading>
              </Link>
              <Link href={datas.url} target={"_blank"}>
                <Image
                  src={datas.images.jpg.image_url}
                  _hover={{ transform: "scale(1.01)" }}
                  transition={"all 0.5s"}
                  borderRadius={5}
                  boxShadow={"dark-lg"}
                  alt={datas.name}
                />
              </Link>
              <Stat textAlign={"center"}>
                <StatLabel>Favorite</StatLabel>
                <StatNumber>
                  <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
                    <FaHeart />
                    <Text>
                      {datas.favorites === null ? "-" : datas.favorites}
                    </Text>
                  </Flex>
                </StatNumber>
              </Stat>
              <Text>{datas.about}</Text>
              <Divider />
              <TableContainer>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td>Name</Td>
                      <Link href={datas.url}>
                        <Td>{datas.name}</Td>
                      </Link>
                    </Tr>
                    <Tr>
                      <Td>Kanji Name</Td>
                      <Td>
                        <Link href={datas.url}>
                          <Tag size="lg" colorScheme="red" borderRadius="full">
                            <Avatar
                              src={datas.images.jpg.image_url}
                              size="xs"
                              name={datas.name_kanji}
                              ml={-1}
                              mr={2}
                            />
                            <TagLabel>{datas.name_kanji}</TagLabel>
                          </Tag>
                        </Link>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </VStack>
          </Flex>
        );
      }
    } else if (query === "people") {
      if (datas !== undefined) {
        return (
          <Flex
            Flex
            gap={10}
            flexDir={window.innerWidth <= 854 ? "column" : "row"}
          >
            <VStack>
              <Link href={datas.url} target={"_blank"}>
                <Heading size={"md"} cursor={"pointer"} textAlign={"center"}>
                  {datas.name}
                </Heading>
              </Link>
              <Link href={datas.url} target={"_blank"}>
                <Image
                  src={datas.images.jpg.image_url}
                  _hover={{ transform: "scale(1.01)" }}
                  transition={"all 0.5s"}
                  borderRadius={5}
                  boxShadow={"dark-lg"}
                  alt={datas.name}
                />
              </Link>
              <Stat textAlign={"center"}>
                <StatLabel>Favorite</StatLabel>
                <StatNumber>
                  <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
                    <FaHeart />
                    <Text>
                      {datas.favorites === null ? "-" : datas.favorites}
                    </Text>
                  </Flex>
                </StatNumber>
              </Stat>
              <Text>{datas.about}</Text>
              <TableContainer>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td>Name</Td>
                      <Link href={datas.url}>
                        <Td>{datas.name}</Td>
                      </Link>
                    </Tr>
                    <Tr>
                      <Td>Given Name</Td>
                      <Td>
                        <Link
                          href={
                            datas.website_url === null
                              ? datas.url
                              : datas.website_url
                          }
                        >
                          <Tag size="lg" colorScheme="red" borderRadius="full">
                            <Avatar
                              src={datas.images.jpg.image_url}
                              size="xs"
                              name={datas.given_name}
                              ml={-1}
                              mr={2}
                            />
                            <TagLabel>{datas.given_name}</TagLabel>
                          </Tag>
                        </Link>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Birthday</Td>
                      <Td>{new Date(datas.birthday).toLocaleDateString()}</Td>
                    </Tr>
                    <Tr>
                      <Td>Family Name</Td>
                      <Link href={datas.url}>
                        <Td>{datas.family_name}</Td>
                      </Link>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </VStack>
          </Flex>
        );
      }
    } else if (query === "users") {
      if (datas !== undefined) {
        return (
          <Flex
            Flex
            gap={10}
            flexDir={window.innerWidth <= 854 ? "column" : "row"}
          >
            <VStack>
              <Link href={datas.url} target={"_blank"}>
                <Heading size={"md"} cursor={"pointer"} textAlign={"center"}>
                  {datas.username}
                </Heading>
              </Link>
              <Link href={datas.url} target={"_blank"}>
                <Image
                  src={datas.images.jpg.image_url}
                  _hover={{ transform: "scale(1.01)" }}
                  transition={"all 0.5s"}
                  borderRadius={5}
                  boxShadow={"dark-lg"}
                  alt={datas.username}
                />
              </Link>
              <TableContainer>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td>Last Online</Td>
                      <Td>{new Date(datas.last_online).toLocaleString()}</Td>
                    </Tr>
                    <Tr>
                      <Td>Gender</Td>
                      <Td>{datas.gender === null ? "-" : datas.gender}</Td>
                    </Tr>
                    <Tr>
                      <Td>Birthday</Td>
                      <Td>{new Date(datas.birthday).toLocaleDateString()}</Td>
                    </Tr>
                    <Tr>
                      <Td>Location</Td>
                      <Td>{datas.location === null ? "-" : datas.location}</Td>
                    </Tr>
                    <Tr>
                      <Td>Joined</Td>
                      <Td>{new Date(datas.joined).toLocaleDateString()}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </VStack>
          </Flex>
        );
      }
    } else {
        return(
            <Heading>Weabo Generator</Heading>
        )
    }
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"100vh"}
      flexDir={"column"}
      gap={2}
      p={10}
    >
      {showContent()}
      <Flex gap={1}>
        <Button onClick={getRandomAnime}>Generate</Button>
        <Select
          id="select"
          onChange={changeValueOption}
          variant="filled"
          value={query}
        >
          <option value="anime" selected>
            Anime
          </option>
          <option value="manga">Manga</option>
          <option value="characters">Characters</option>
          <option value="people">People</option>
          <option value="users">Users</option>
        </Select>
      </Flex>
    </Flex>
  );
};
