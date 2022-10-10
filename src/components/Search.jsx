import React from "react";
import axios from "axios";
import { useEffect } from "react";
import {
  Text,
  Image,
  Grid,
  GridItem,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";

export const Search = () => {
  const { q } = useParams();
  const [datas, setDatas] = React.useState([]);
  const [anime, setAnime] = React.useState([]);
  const [manga, setManga] = React.useState([]);

  const gridTemplate = useBreakpointValue(
    {
      base: "repeat(2, 1fr)",
      md: "repeat(6, 1fr)",
    },
    {
      fallback: "md",
    }
  );

  useEffect(() => {
    const search = async () => {
      const responseAnime = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${q}`
      );
      const responseManga = await axios.get(
        `https://api.jikan.moe/v4/manga?q=${q}`
      );
      const arr1 = responseAnime.data.data;
      setAnime(arr1);
      const arr2 = responseManga.data.data;
      setManga(arr2);
      const arr3 = arr1.concat(arr2);
      setDatas(arr3);
    };
    search();
  }, [datas, q]);

  return (
    <Box p={5}>
      <Grid templateColumns={gridTemplate} gap={6}>
        {anime.map((data) => {
          return (
            <GridItem key={data.title} textAlign={"center"}>
              <Link to={`../../anime/${data.mal_id}`} relative="path">
                <Box>
                  <Image
                    alt={data.title}
                    width={"200px"}
                    height={"300px"}
                    src={data.images.jpg.large_image_url}
                    _hover={{ transform: "scale(1.05)" }}
                    transition={"all 0.5s"}
                    borderRadius={5}
                    boxShadow={"dark-lg"}
                  />
                  <Text fontWeight={"bold"} pt={3} fontSize={"sm"}>
                    {data.title}
                  </Text>
                </Box>
              </Link>
            </GridItem>
          );
        })}
        {manga.map((data) => {
          return (
            <GridItem key={data.title} textAlign={"center"}>
              <Link to={`../../manga/${data.mal_id}`} relative="path">
                <Box>
                  <Image
                    alt={data.title}
                    width={"200px"}
                    height={"300px"}
                    src={data.images.jpg.large_image_url}
                    _hover={{ transform: "scale(1.05)" }}
                    transition={"all 0.5s"}
                    borderRadius={5}
                    boxShadow={"dark-lg"}
                  />
                  <Text fontWeight={"bold"} pt={3} fontSize={"sm"}>
                    {data.title}
                  </Text>
                </Box>
              </Link>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};
