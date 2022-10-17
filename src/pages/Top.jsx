import React from "react";
import { useEffect } from "react";
import { VStack } from "@chakra-ui/react";
import { getTop } from '../utils/fetch'
import { TopSection } from "../components/TopSection";

export const Top = () => {
  const [topCharacter, setTopCharacter] = React.useState([]);
  const [topAnime, setTopAnime] = React.useState([]);
  const [topManga, setTopManga] = React.useState([]);
  const [topPeople, setTopPeople] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false)

  useEffect(() => {
    getTop( 'characters', setTopCharacter, false, setIsLoaded)
    getTop( 'anime', setTopAnime, false, setIsLoaded)
    getTop( 'manga', setTopManga, false, setIsLoaded)
    getTop( 'people', setTopPeople, false, setIsLoaded)
  }, []);

  return (
    <VStack>
      <TopSection urlCategory={'character'} chara={true} datas={topCharacter} heading={"Top Character"} isLoaded={isLoaded} />
      <TopSection urlCategory={'anime'} anime={true} datas={topAnime} heading={"Top Anime"} isLoaded={isLoaded} />
      <TopSection urlCategory={'manga'} manga={true} datas={topManga} heading={"Top Manga"} isLoaded={isLoaded} />
      <TopSection urlCategory={'people'} people={true} datas={topPeople} heading={"Top People"} isLoaded={isLoaded} />
    </VStack>
  );
};
