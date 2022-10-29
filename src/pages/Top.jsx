import React from "react";
import { VStack } from "@chakra-ui/react";
import { TopSection } from "../components/TopSection";

export const Top = () => {
  return (
    <VStack>
      <TopSection urlCategory={'character'} chara={true} heading={"Top Character"} category={'characters'} limit={5} />
      <TopSection urlCategory={'anime'} anime={true} heading={"Top Anime"} category={'anime'} limit={5} />
      <TopSection urlCategory={'manga'} manga={true} heading={"Top Manga"} category={'manga'} limit={5} />
      <TopSection urlCategory={'people'} people={true} heading={"Top People"} category={'people'} limit={5} />
    </VStack>
  );
};
