import React from "react";
import { GridItem, Image, Text, Flex, Skeleton } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Result = ({ data, isLoaded }) => {
  return (
    <>
      <GridItem textAlign={"center"}>
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
    </>
  );
};
