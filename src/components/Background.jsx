import React from "react";
import { Text, Heading, Skeleton, SkeletonText } from "@chakra-ui/react";

export const Background = ({ datas, isLoaded }) => {
  return (
    <>
      <Skeleton isLoaded={isLoaded} mt={4}>
        <Heading textAlign={"center"} pt={5} size={"md"}>
          Background
        </Heading>
      </Skeleton>
      <SkeletonText mt={2} noOfLines={10} isLoaded={isLoaded}>
        <Text textAlign={"left"}>
          {datas.background === null
            ? "There is No Background"
            : datas.background}
        </Text>
      </SkeletonText>
    </>
  );
};
