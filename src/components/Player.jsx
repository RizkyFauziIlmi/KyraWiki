import React from "react";
import ReactPlayer from "react-player";
import { Alert, AlertIcon, Skeleton } from "@chakra-ui/react";

export const Player = ({ datas, isLoaded }) => {
  return (
    <>
      {datas.trailer.url === null ? (
        <Skeleton isLoaded={isLoaded}>
          <Alert status="error" height={"max-content"}>
            <AlertIcon />
            There is no trailer
          </Alert>
        </Skeleton>
      ) : (
        <Skeleton isLoaded={isLoaded}>
          <ReactPlayer url={datas.trailer.url} loop controls width={"100%"} />
        </Skeleton>
      )}
    </>
  );
};
