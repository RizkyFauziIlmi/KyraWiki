import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../firebase/firebase-config";
import { useEffect } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Spinner,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDocument } from "react-firebase-hooks/firestore";
import { motion } from "framer-motion";
import { FcDislike } from "react-icons/fc";

export const Favorite = () => {
  const [user, loading, error] = useAuthState(auth);
  const [value, fireLoading, fireError] = useDocument(
    doc(db, "infoAccount", localStorage.getItem("email")) 
  );
  const [favoriteList, setFavoriteList] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  const gridTemplate = useBreakpointValue(
    {
      base: "repeat(2, 1fr)",
      md: "repeat(6, 1fr)",
    },
    {
      fallback: "md",
    }
  );

  useEffect(() => {
    const getFavoriteList = () => {
      value.data().favorites.map(async (favorite) => {
        await axios
          .get(`https://api.jikan.moe/v4/anime/${favorite.mal_id}`)
          .then((response) => {
            setFavoriteList((arr) => [...arr, response.data.data]);
          })
          .catch((error) => {
            toast({
              title: "400 Bad Request",
              status: "error",
              description: error.message
            })
          });
      });
    };

    if (user && !fireLoading) {
      setFavoriteList([]);
      getFavoriteList();
    }
  }, [fireLoading, toast, user, value]);

  const deleteTargetFavorite = async (mal_id, name) => {
    await updateDoc(doc(db, "infoAccount", localStorage.getItem("email")), {
      favorites: arrayRemove({ status: true, mal_id: `${mal_id}` }),
    })
    .then(() => {
      toast({
        title: "Deleted Successfully",
        status: "success",
        description: `${name} was successfully deleted from the list`,
        isClosable: true
      })
    })
    .catch((error) => {
      toast({
        title: "Failed to Delete",
        status: "success",
        description: `${error.message}`,
        isClosable: true
      })
    })
  };

  if (error && fireError) {
    return (
      <Flex height={"100vw"} justifyContent={"center"} alignItems={"center"}>
        <Heading>Error</Heading>
        <Text>{error.message}</Text>
      </Flex>
    );
  }
  if (loading && fireLoading) {
    return (
      <Flex height={"50vw"} justifyContent={"center"} alignItems={"center"}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (user) {
    return (
      <>
        <Heading textAlign={"center"}>Favorite List</Heading>
        {fireError && (
          <span>
            {JSON.stringify(fireError.code)}Error:{" "}
            {JSON.stringify(fireError.message)}
          </span>
        )}
        {value && (
          <Grid templateColumns={gridTemplate} gap={5} p={5}>
            {favoriteList.map((value, index) => {
              return (
                <GridItem key={index}>
                  <Flex flexDir={"column"} gap={1} alignItems={'center'} justifyContent={'center'} >
                    <Link to={`/anime/${value.mal_id}`} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                      <Image
                        src={value.images.jpg.image_url}
                        width={"200px"}
                        height={"250px"}
                        boxShadow={"dark-lg"}
                      />
                      <Text fontWeight={"bold"} textAlign={"center"}>
                        {value.title}
                      </Text>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconButton
                        icon={<FcDislike />}
                        onClick={() => deleteTargetFavorite(value.mal_id, value.title)}
                        boxShadow={"lg"}
                        _active={{ boxShadow: "none" }}
                      />
                    </motion.button>
                  </Flex>
                </GridItem>
              );
            })}
          </Grid>
        )}
      </>
    );
  }

  return navigate("/login");
};
