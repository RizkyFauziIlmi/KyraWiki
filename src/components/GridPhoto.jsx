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
import { motion } from "framer-motion";

export const GridPhoto = ({
  query = "https://api.jikan.moe/v4/seasons/now",
  reverse = false,
  title = "",
  column = 2,
  subTitle = "",
}) => {
  const [datas, setDatas] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const gridTemplate = useBreakpointValue(
    {
      base: `repeat(${column}, 1fr)`,
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
    <Flex
      textAlign={"center"}
      justifyContent={"center"}
      width={"100%"}
      overflow={"hidden"}
      flexDir={"column"}
      alignItems={"center"}
    >
      <Heading textTransform={"uppercase"}>
        {title}
        {subTitle}
      </Heading>
      <Grid gridTemplateColumns={gridTemplate} gap={6} p={2}>
        {datas.map((data, index) => {
          return (
            <GridItem key={index}>
              <Skeleton isLoaded={isLoaded}>
                <Box
                  boxShadow={"2xl"}
                  p={2}
                  overflow="hidden"
                  width={"fit-content"}
                >
                  <Link to={`../anime/${data.mal_id}`} relative="path">
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Image
                        borderRadius={"5px"}
                        border={"1px solid black"}
                        width={"150px"}
                        height={"200px"}
                        src={data.images.jpg.image_url}
                      />
                    </motion.div>
                    <Heading
                      fontSize={"md"}
                      width={"150px"}
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
                    width={"150px"}
                  >
                    {data.genres.map((genre, index) => {
                      return <Badge key={index}>{genre.name}</Badge>;
                    })}
                  </Flex>
                  <Text width={"150px"}>{data.broadcast.string}</Text>
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
