import React from "react";
import { GridItem, Image, Text, Flex } from '@chakra-ui/react'
import { Link } from "react-router-dom";

export const Result = ({ data }) => {

  return (
      <>
      <GridItem
        textAlign={"center"}
      >
        <Link to={`../../anime/${data.mal_id}`} relative="path">
          <Flex flexDir={'column'} alignItems={'center'}>
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
            <Text fontWeight={"bold"} pt={3} fontSize={"sm"}>
              {data.title}
            </Text>
          </Flex>
        </Link>
      </GridItem>
    </>
  );
};
