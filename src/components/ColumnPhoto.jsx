import {
  Divider,
  Flex,
  Heading,
  Image,
  Skeleton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import moment from 'moment'

export const ColumnPhoto = () => {
  const [datas, setDatas] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

    const now = moment(new Date())

  const flexDir = useBreakpointValue(
    {
      base: "column",
      md: "row",
    },
    {
      fallback: "md",
    }
  );
  
  const textAlign = useBreakpointValue(
    {
        base: "center",
        md: "left"
    },
    {
        fallback: "md"
    }
  )

  const alignSelf = useBreakpointValue(
    {
        base: "center",
        md: "flex-start"
    },
    {
        fallback: "md"
    }
  )

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
        console.log(error);
      });
  };

  useEffect(() => {
    getUpcoming();
  }, []);

  return (
    <>
      <Flex flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
        <Flex flexDir={"column"} pl={2} pr={2}>
          <Heading textAlign={"center"} p={1}>
            Upcoming Anime
          </Heading>
          <Divider />
          {datas.map((data, index) => {
            return (
              <motion.div key={index} whileHover={{ scale: 1.05 }}>
                <Skeleton isLoaded={isLoaded}>
                  <Flex
                    boxShadow={"dark-lg"}
                    borderRadius={"10px"}
                    flexDir={flexDir}
                    width={"80vw"}
                    alignItems={"center"}
                    mt={5}
                    mb={5}
                    p={2}
                    flexBasis={"auto"}
                  >
                    <Text fontWeight={"bold"} p={2} width={"max-content"}>
                      {index + 1}
                    </Text>
                    <Link to={`/anime/${data.mal_id}`} relative="path">
                      <Image
                        src={data.images.jpg.image_url}
                        height={"fit-content"}
                        alt={data.title}
                      />
                    </Link>
                    <Flex flexDir={"column"} p={2} placeSelf={alignSelf}>
                      <Link to={`/anime/${data.mal_id}`} relative="path">
                        <Text fontWeight={"bold"} textAlign={textAlign}>
                          {data.title}
                        </Text>
                      </Link>
                      <Text>{data.members} Members</Text>
                      <Text>
                        {data.type} | {data.rating}
                      </Text>
                      <Text>Source: {data.source}</Text>
                      <Text fontWeight={'bold'}>{now.to(data.aired.from).toLowerCase() === "invalid date" ? "" : new Date(data.aired.from).toDateString()} {now.to(data.aired.from).toUpperCase()}</Text>
                    </Flex>
                  </Flex>
                </Skeleton>
              </motion.div>
            );
          })}
        </Flex>
      </Flex>
    </>
  );
};
