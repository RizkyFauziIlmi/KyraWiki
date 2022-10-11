import React from "react";
import { Text, Heading } from "@chakra-ui/react";

export const Background = ({ datas }) => {
  return (
    <>
      <Heading textAlign={"center"} pt={5} size={"md"}>
        Background
      </Heading>
      <Text textAlign={'center'}>
        {datas.background === null
          ? "There is No Background"
          : datas.background}
      </Text>
    </>
  );
};
