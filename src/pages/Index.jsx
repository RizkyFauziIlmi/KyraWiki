import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ImageFlex } from "../components/ImageFlex";
import { getSchedules, getSeasonNow } from "../utils/fetch";
import { todayString } from "../utils/todayString";

export const Index = () => {
  const [seasonNow, setSeasonNow] = React.useState([]);
  const [newEpisode, setNewEpisode] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    getSeasonNow(setSeasonNow, false, 5, setIsLoaded);
    getSchedules(setNewEpisode, false, todayString(), setIsLoaded);
  }, []);

  return (
    <Box pt={10}>
      <ImageFlex
        datas={seasonNow}
        title="This Season"
        linkTitle="/"
        isLoaded={isLoaded}
      />
      <ImageFlex
        datas={newEpisode}
        title="Today Episode"
        linkTitle="/schedule"
        isLoaded={isLoaded}
      />
    </Box>
  );
};
