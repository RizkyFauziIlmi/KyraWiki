import {
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Skeleton,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import moment from "moment";

export const ColumnPhoto = () => {
  const [datas, setDatas] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const toast = useToast();

  const now = moment(new Date());

  const alignSelf = useBreakpointValue(
    {
      base: "center",
      md: "flex-start",
    },
    {
      fallback: "md",
    }
  );

  useEffect(() => {
    const getUpcoming = async () => {
      await axios
        .get("https://api.jikan.moe/v4/seasons/upcoming")
        .then((response) => {
          setDatas(response.data.data);
          setTimeout(() => {
            setIsLoaded(true);
          });
        })
        .catch((error) => {
          toast({
            title: "400 Bad Request",
            status: "error",
            description: error.message,
          });
        });
    };

    getUpcoming();
  }, [toast]);

  return (
    <>
      <Flex flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
        <Flex flexDir={"column"} pl={2} pr={2}>
          <Heading textAlign={"center"} p={1}>
            Upcoming Anime
          </Heading>
          <Divider />
          <Grid p={'2rem'} templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={'1rem'}>
            {datas.map((data, index) => {
              return (
                <GridItem key={index}>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Skeleton isLoaded={isLoaded}>
                      <Flex
                        boxShadow={"dark-lg"}
                        borderRadius={"10px"}
                        flexDir={'row'}
                        height={['5rem', '5rem', '10rem', '10rem']} 
                        width={['10rem', '10rem', '20rem', '20rem']}
                        alignItems={"center"}
                        flexBasis={"auto"}
                      >
                        <Link style={{ height: '100%', width: '40%' }} to={`/anime/${data.mal_id}`} relative="path">
                          <Image
                            border={'yellow solid 1px'}
                            height={'100%'}
                            width={'100%'}
                            src={data.images.jpg.image_url}
                            alt={data.title}
                          />
                        </Link>
                        <Flex width={'60%'} fontWeight={'light'} overflow={'auto'} flexDir={"column"} p={2} placeSelf={alignSelf} height={'100%'}>
                          <Link to={`/anime/${data.mal_id}`} relative="path">
                            <Heading size={'xs'} fontWeight={"bold"} textAlign={'left'}>
                              {data.title}
                            </Heading>
                          </Link>
                          <Text>{data.members} Members</Text>
                          <Text>
                            {data.type} | {data.rating}
                          </Text>
                          <Text>Source: {data.source}</Text>
                          <Text fontWeight={"bold"}>
                            {now.to(data.aired.from).toLowerCase() ===
                            "invalid date"
                              ? ""
                              : new Date(data.aired.from).toDateString()}{" "}
                            {now.to(data.aired.from).toUpperCase()}
                          </Text>
                        </Flex>
                      </Flex>
                    </Skeleton>
                  </motion.div>
                </GridItem>
              );
            })}
          </Grid>
        </Flex>
      </Flex>
    </>
  );
};
