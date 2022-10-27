import {
  Flex,
  Heading,
  Image,
  Skeleton,
  SkeletonText,
  StatDownArrow,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const ImageFlex = ({
  query = "",
  url = "anime",
  title = "Title",
  linkTitle = "/",
  reverse = false,
}) => {
  const [datas, setDatas] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const toast = useToast()

  useEffect(() => {
    const getSeasonNow = async () => {
      await axios
        .get(query)
        .then((response) => {
          if (reverse) {
            setDatas(response.data.data.reverse().slice(0, 5));
          } else {
            setDatas(response.data.data);
          }
          setTimeout(() => {
            setIsLoaded(true);
          });
        })
        .catch((error) => {
          toast({
            title: "400 Bad Request",
            status: "error",
            description: error.message
          })
        });
    };

    getSeasonNow();
  }, [query, reverse, toast]);

  const height = useBreakpointValue(
    {
      base: "130px",
      md: "300px",
    },
    {
      fallback: "md",
    }
  );

  const width = useBreakpointValue(
    {
      base: "20vw",
      md: "15vw",
    },
    {
      fallback: "md",
    }
  );
  const opacity = useBreakpointValue(
    {
      base: "1",
      md: "0.8",
    },
    {
      fallback: "md",
    }
  );

  return (
    <>
      <Link to={linkTitle}>
        <Flex p={5} gap={2} alignItems={"center"} justifyContent={"center"} >
          <Heading>{title}</Heading>
          <motion.div whileInView={{ rotate: '-90deg' }}>
            <StatDownArrow />
          </motion.div>
        </Flex>
      </Link>
      <Flex justifyContent={"center"}>
        {datas.map((data) => {
          return (
            <Link
              className="link"
              to={`../${url}/${data.mal_id}`}
              relative="path"
              key={data.synopsis === null ? data.url : data.synopsis}
            >
              <Flex
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Skeleton isLoaded={isLoaded}>
                  <Image
                    width={width}
                    height={height}
                    src={data.images.jpg.image_url}
                    opacity={opacity}
                    _hover={{ opacity: 1 }}
                  />
                </Skeleton>
                <SkeletonText isLoaded={isLoaded}>
                  <Text
                    width={width}
                    fontWeight={"bold"}
                    fontSize={"xs"}
                    textAlign={"center"}
                  >
                    {data.title}
                  </Text>
                </SkeletonText>
              </Flex>
            </Link>
          );
        })}
      </Flex>
    </>
  );
};
