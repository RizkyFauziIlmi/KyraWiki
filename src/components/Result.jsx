import React from "react";
import {
  GridItem,
  Image,
  Text,
  Flex,
  Skeleton,
  Grid,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export const Result = ({
  query,
  adult,
  order_by,
  status,
  sort,
  type,
  limit,
  min_score,
  max_score,
}) => {
  const [datas, setDatas] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

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
      await axios
        .get(
          `https://api.jikan.moe/v4/anime?q=${query}${
            adult === true ? "" : "&sfw"
          }&order_by=${order_by}${
            status === "not_specified" ? "&status=" : `&status=${status}`
          }&sort=${sort}${
            type === "all" ? "&type=" : `&type=${type}`
          }&limit=${limit}&min_score=${min_score}&max_score=${max_score}`
        )
        .then((response) => {
          setDatas(response.data.data);
          setTimeout(() => {
            setIsLoaded(true);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    search();
  }, [adult, limit, max_score, min_score, order_by, query, sort, status, type]);

  return (
    <Flex flexDir={'column'}>
      <Heading size={"sm"} textAlign={'center'} p={3}>
        ({datas.length}) Result for '{query}'{" "}
      </Heading>
      <Grid templateColumns={gridTemplate} gap={6}>
        {datas.map((data, index) => {
          return (
            <GridItem textAlign={"center"} key={index}>
              <Link to={`../../anime/${data.mal_id}`} relative="path">
                <Flex flexDir={"column"} alignItems={"center"}>
                  <Skeleton isLoaded={isLoaded}>
                    <Image
                      alt={data.title}
                      width={"150px"}
                      height={"200px"}
                      src={data.images.jpg.large_image_url}
                      _hover={{ transform: "scale(1.05)" }}
                      transition={"all 0.5s"}
                      borderRadius={5}
                      boxShadow={"dark-lg"}
                    />
                  </Skeleton>
                  <Skeleton mt={1} isLoaded={isLoaded}>
                    <Text fontWeight={"bold"} pt={3} fontSize={"sm"}>
                      {data.title}
                    </Text>
                  </Skeleton>
                </Flex>
              </Link>
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
};
