import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";

export const Top = () => {
  const [topCharacter, setTopCharacter] = React.useState([]);
  const [topAnime, setTopAnime] = React.useState([]);
  const [topManga, setTopManga] = React.useState([]);
  const [topPeople, setTopPeople] = React.useState([]);

  const getTopCharacter = async () => {
    const response = await axios.get(
      "https://api.jikan.moe/v4/top/characters?limit=5"
    );
    setTopCharacter(response.data.data);
  };

  const getTopAnime = async () => {
    const response = await axios.get(
      "https://api.jikan.moe/v4/top/anime?limit=5"
    );
    setTopAnime(response.data.data);
  };

  const getTopManga = async () => {
    const response = await axios.get(
      "https://api.jikan.moe/v4/top/manga?limit=5"
    );
    setTopManga(response.data.data);
  };

  const getTopPeople = async () => {
    const response = await axios.get('https://api.jikan.moe/v4/top/people?limit=5')
    setTopPeople(response.data.data)
  } 

  useEffect(() => {
    getTopCharacter();
    getTopAnime();
    getTopManga();
    getTopPeople()
  }, []);

  return (
    <VStack p={5}>
      <Heading pt={5}>Top Characters</Heading>
      <Flex>
        {topCharacter.map((chara) => {
          return (
            <Link className="link" to={chara.url} key={chara.url}>
              <Image
                src={chara.images.jpg.image_url}
                transition={"all 0.5s"}
                width={"max-content"}
                className="images"
                borderRadius={"sm"}
                boxShadow={"xl"}
                border={"1px solid white"}
              />
              <Text fontSize={"xx-small"} textAlign={"center"}>
                {chara.name} ({chara.name_kanji})
              </Text>
            </Link>
          );
        })}
      </Flex>
      <Heading pt={5}>Top Anime</Heading>
      <Flex>
        {topAnime.map((anime) => {
          return (
            <Link
              className="link"
              relative="path"
              to={`../anime/${anime.mal_id}`}
              key={anime.url}
            >
              <Image
                src={anime.images.jpg.image_url}
                transition={"all 0.5s"}
                width={"max-content"}
                className="images"
                borderRadius={"sm"}
                boxShadow={"xl"}
                border={"1px solid white"}
              />
              <Text fontSize={"xx-small"} textAlign={"center"}>
                {anime.title} ({anime.score})
              </Text>
            </Link>
          );
        })}
      </Flex>
      <Heading pt={5}>Top Manga</Heading>
      <Flex>
        {topManga.map((manga) => {
          return (
            <Link
              className="link"
              relative="path"
              to={`../manga/${manga.mal_id}`}
              key={manga.url}
            >
              <Image
                src={manga.images.jpg.image_url}
                transition={"all 0.5s"}
                width={"max-content"}
                className="images"
                borderRadius={"sm"}
                boxShadow={"xl"}
                border={"1px solid white"}
              />
              <Text fontSize={"xx-small"} textAlign={"center"}>
                {manga.title} ({manga.score})
              </Text>
            </Link>
          );
        })}
      </Flex>
      <Heading pt={5}>Top People</Heading>
      <Flex>
        {topPeople.map((people) => {
          return (
            <Link
              className="link"
              relative="path"
              to={`../people/${people.mal_id}`}
              key={people.url}
            >
              <Image
                src={people.images.jpg.image_url}
                transition={"all 0.5s"}
                width={"max-content"}
                className="images"
                borderRadius={"sm"}
                boxShadow={"xl"}
                border={"1px solid white"}
              />
              <Text fontSize={"xx-small"} textAlign={"center"}>
                {people.name} ({people.favorites})
              </Text>
            </Link>
          );
        })}
      </Flex>
    </VStack>
  );
};
