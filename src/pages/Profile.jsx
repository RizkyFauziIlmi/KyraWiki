import {
  Avatar,
  AvatarBadge,
  Button,
  Flex,
  Heading,
  Image,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spinner,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { auth } from "../firebase/firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { FcCheckmark, FcClapperboard, FcLike } from "react-icons/fc";
import { motion } from "framer-motion";

export const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const toast = useToast();

  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        toast({
          title: "Logout Successful",
          status: "success",
          isClosable: true,
        });
        localStorage.removeItem("email");
        navigate("/");
      })
      .catch((error) => {
        toast({
          title: "Logout Failed",
          description: error.message,
          status: "error",
          isClosable: true,
        });
      });
  };

  const width = useBreakpointValue(
    {
      base: "40%",
      md: "20%",
    },
    {
      fallback: "md",
    }
  );

  const flexDir = useBreakpointValue(
    {
      base: "column",
      md: "row",
    },
    {
      fallback: "md",
    }
  );

  const display = useBreakpointValue(
    {
      base: "none",
      md: "inherit",
    },
    {
      fallback: "md",
    }
  );
  if (error) {
    return (
      <Flex
        height={"100vh"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <p>Error: {error.message}</p>
      </Flex>
    );
  }
  if (loading) {
    return (
      <Flex height={"50vw"} justifyContent={"center"} alignItems={"center"}>
        <Spinner size="xl" />
      </Flex>
    );
  }
  if (user) {
    return (
      <Flex>
        <Flex
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"space-between"}
          height={"100vh"}
          width={width}
          boxShadow={"dark-lg"}
          display={display}
        >
          <Flex alignItems={"center"} gap={6} p={2}>
            <SkeletonCircle isLoaded={!loading}>
              <Avatar src={user.photoURL} name={user.displayName}>
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
            </SkeletonCircle>
            <SkeletonText noOfLines={2} isLoaded={!loading}>
              <Text fontWeight={"bold"}>{user.displayName}</Text>
            </SkeletonText>
          </Flex>
          <Flex gap={2} p={2} flexDir={flexDir}>
            <Link to={"/login"}>
              <Button size={"sm"}>Login</Button>
            </Link>
            <Button size={"sm"} onClick={logOut}>
              Logout
            </Button>
          </Flex>
        </Flex>
        <Flex flexDir={"column"} p={2}>
          <Flex
            boxShadow={"dark-lg"}
            p={5}
            flexDir={flexDir}
            borderRadius={"10px"}
            width={"80%"}
          >
            <Skeleton isLoaded={!loading}>
              <Image
                src={user.photoURL}
                alt={user.displayName}
                objectFit={"cover"}
              />
            </Skeleton>
            <Flex flexDir={"column"} width={"100%"} pl={1}>
              <Skeleton isLoaded={!loading}>
                <Heading>{user.displayName}</Heading>
              </Skeleton>
              <SkeletonText noOfLines={3} mt={1.5} isLoaded={!loading}>
                <Text>Email : {user.email}</Text>
                <Text>{user.phoneNumber}</Text>
                <Text>
                  Joined at :{" "}
                  {new Date(user.metadata.creationTime).toLocaleString()}
                </Text>
                <Text>
                  Last Online :{" "}
                  {new Date(user.metadata.lastSignInTime).toLocaleString()}
                </Text>
              </SkeletonText>
            </Flex>
          </Flex>
          <Flex
            p={5}
            gap={2}
            flexDir={"column"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            height={"max-content"}
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to={'/profile/favorites'} relative={'route'}>
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  leftIcon={<FcLike />}
                  variant="outline"
                  boxShadow={"lg"}
                  _active={{ boxShadow: "none" }}
                >
                  Favorite
                </Button>
              </Link>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <Button
                rightIcon={<ArrowForwardIcon />}
                leftIcon={<FcClapperboard />}
                variant="outline"
                boxShadow={"lg"}
                _active={{ boxShadow: "none" }}
              >
                Watching
              </Button>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <Button
                rightIcon={<ArrowForwardIcon />}
                variant="outline"
                leftIcon={<FcCheckmark />}
                boxShadow={"lg"}
                _active={{ boxShadow: "none" }}
              >
                Completed
              </Button>
            </motion.button>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  return navigate("/login");
};
