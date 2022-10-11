import React from "react";
import { Text, Heading } from '@chakra-ui/react'

export const Synopsis = ({ datas }) => {
  return (
    <>
      <Heading textAlign={"center"} pt={5} size={"md"}>
        Synopsis
      </Heading>
      <Text>
        {datas.synopsis === null ? "There is No Sysnopsis" : datas.synopsis}
      </Text>
    </>
  );
};
