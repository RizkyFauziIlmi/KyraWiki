import { Box } from "@chakra-ui/react";
import React from "react";
import { ImageFlex } from "../components/ImageFlex";
import { Jumbotron } from "../components/Jumbotron";
import { todayString } from "../utils/todayString";

export const Index = () => {
  return (
    <Box pt={10} overflow={"hidden"}>
      <Jumbotron />
      <ImageFlex
        query="https://api.jikan.moe/v4/seasons/now?limit=5"
        url="anime"
        title="This Season"
        linkTitle="/this-season"
      />
      <ImageFlex
        query={`https://api.jikan.moe/v4/schedules?filter=${todayString()}`}
        url="anime"
        title="Today Episode"
        linkTitle="/schedule"
        reverse={true}
      />
    </Box>
  );
};
