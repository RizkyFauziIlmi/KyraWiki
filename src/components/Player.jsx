import React from "react";
import ReactPlayer from "react-player";
import { Alert,AlertIcon } from "@chakra-ui/react";

export const Player = ({ datas }) => {
  return (
    <>
      {datas.trailer.url === null ? (
        <Alert status="error" height={"max-content"}>
          <AlertIcon />
          There is no trailer
        </Alert>
      ) : (
        <ReactPlayer url={datas.trailer.url} loop controls width={"100%"} />
      )}
    </>
  );
};
