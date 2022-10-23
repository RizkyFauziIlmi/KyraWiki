import React from "react";
import { useEffect } from "react";
import axios from "axios";
import {
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Skeleton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const GridPhoto = ({ query = "https://api.jikan.moe/v4/seasons/now", reverse = false, title = "" }) => {
  const [datas, setDatas] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const gridTemplate = useBreakpointValue(
    {
      base: "repeat(2, 1fr)",
      md: "repeat(5, 1fr)",
    },
    {
      fallback: "md",
    }
  );

  useEffect(() => {
    const getApi = async () => {
        await axios
          .get(query)
          .then((response) => {
            if (reverse) {
                setDatas(response.data.data.reverse());
            } else {
                setDatas(response.data.data);
            }
            setTimeout(() => {
              setIsLoaded(true);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      };

    getApi();
  }, [query, reverse]);

  return (
    <Flex justifyContent={"center"} width={'100%'} overflow={'hidden'} flexDir={"column"} alignItems={"center"}>
      <Heading textTransform={"uppercase"}>{title}</Heading>
      <Grid gridTemplateColumns={gridTemplate} gap={6}>
        {datas.map((data, index) => {
          return (
            <GridItem key={index}>
              <Skeleton isLoaded={isLoaded}>
                <Box
                  textAlign={"center"}
                  maxW={"15vw"}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Link to={`../anime/${data.mal_id}`} relative="path">
                    <Image
                      height={"20vw"}
                      minWidth={"15vw"}
                      src={data.images.jpg.image_url}
                    />
                    <Heading
                      fontSize={"md"}
                      maxW={"15vw"}
                      wordBreak={"break-word"}
                    >
                      {data.title}
                    </Heading>
                  </Link>
                  <Flex
                    pt={1}
                    flexWrap={"wrap"}
                    justifyContent={"center"}
                    overflow={"hidden"}
                    gap={1}
                  >
                    {data.genres.map((genre, index) => {
                      return <Badge key={index}>{genre.name}</Badge>;
                    })}
                  </Flex>
                  <Text>{data.broadcast.string}</Text>
                  {}
                </Box>
              </Skeleton>
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
};
