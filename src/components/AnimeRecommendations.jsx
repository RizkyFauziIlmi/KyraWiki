import React from "react";
import { useEffect } from "react";
import {
  Heading,
  Grid,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

export const AnimeRecommendations = () => {
  const [datas, setDatas] = React.useState([]);

  const getAnimeRecommendations = async () => {
    const response = await axios.get(
      "https://api.jikan.moe/v4/recommendations/anime"
    );
    console.log(response.data.data[0].entry);
    setDatas(response.data.data);
  };

  useEffect(() => {
    getAnimeRecommendations();
  }, []);

  return (
    <>
      <Heading>AnimeRecommendations</Heading>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {/* {datas.entry.map((data) => {
          return (
            <GridItem key={data.title}>
              <Text>{data.title}</Text>
            </GridItem>
          );
        })} */}
        {console.log(datas[0])}
      </Grid>
      <Button onClick={getAnimeRecommendations}>get</Button>
    </>
  );
};
