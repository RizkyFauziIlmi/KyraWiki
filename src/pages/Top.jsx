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

  useEffect(() => {
    getTop( 'characters', setTopCharacter )
    getTop( 'anime', setTopAnime )
    getTop( 'manga', setTopManga )
    getTop( 'people', setTopPeople )
  }, []);

  return (
    <VStack>
      <TopSection urlCategory={'character'} chara={true} datas={topCharacter} heading={"Top Character"} />
      <TopSection urlCategory={'anime'} anime={true} datas={topAnime} heading={"Top Anime"} />
      <TopSection urlCategory={'manga'} manga={true} datas={topManga} heading={"Top Manga"} />
      <TopSection urlCategory={'people'} people={true} datas={topPeople} heading={"Top People"} />
    </VStack>
  );
};
