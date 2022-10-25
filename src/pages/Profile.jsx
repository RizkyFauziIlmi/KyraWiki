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
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { auth } from "../firebase/firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const toast = useToast();

  const logOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Success Logout",
        status: "success",
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const width = useBreakpointValue(
    {
      base: "40%",
      md: "20%"
    },
    {
      fallback: "md"
    }
  )

  const flexDir = useBreakpointValue(
    {
      base: "column",
      md: "row"
    },
    {
      fallback: "md"
    }
  )
  return auth.currentUser === null ? (
    <Flex
      width={"100vw"}
      height={"100vh"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Heading>You Are Not Logged In</Heading>
      <Text>Please login first!</Text>
      <Link to={"/login"}>
        <Button>Login Now</Button>
      </Link>
    </Flex>
  ) : (
    <Flex>
      <Flex
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
        height={"100vh"}
        width={width}
        boxShadow={"dark-lg"}
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
            <Button>Login</Button>
          </Link>
          <Button onClick={logOut}>Logout</Button>
        </Flex>
      </Flex>
      <Flex flexDir={"column"} p={2}>
        <Flex boxShadow={"dark-lg"} p={5} flexDir={flexDir} borderRadius={"10px"}>
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
      </Flex>
    </Flex>
  );
};
