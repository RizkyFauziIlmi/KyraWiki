import React from "react";
import { Text, Heading, SkeletonText, Skeleton } from "@chakra-ui/react";

export const Synopsis = ({ datas, isLoaded }) => {
  return (
    <>
      <Skeleton mt={4} isLoaded={isLoaded}>
        <Heading textAlign={"center"} pt={5} size={"md"}>
          Synopsis
        </Heading>
      </Skeleton>
      <SkeletonText isLoaded={isLoaded} mt={2} noOfLines={10}>
        <Text>
          {datas.synopsis === null ? "There is No Sysnopsis" : datas.synopsis}
        </Text>
      </SkeletonText>
    </>
  );
};
