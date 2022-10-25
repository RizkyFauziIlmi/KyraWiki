import {
  Avatar,
  AvatarBadge,
  Badge,
  Button,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { auth } from "../firebase/firebase-config";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export const UserLog = ({ close }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const logOut = async () => {
    await signOut(auth).then(() => {
      toast({
        title: "Success Logout",
        status: "success",
        isClosable: true,
      });
      navigate("/");
    });
  };

  return auth.currentUser === null ? (
    <Flex alignItems={"center"} justifyContent={"space-between"} p={2}>
      <Flex alignItems={"center"} gap={1}>
        <Avatar />
        <Badge height={"max-content"}>not logged</Badge>
      </Flex>
      <>
        <Link to={"/login"}>
          <Button onClick={close}>Login</Button>
        </Link>
      </>
    </Flex>
  ) : (
    <Flex justifyContent={"space-between"} alignItems={"center"}>
      <Flex alignItems={"center"} gap={2} fontWeight={"bold"} p={5}>
        <Avatar
          name={auth.currentUser.displayName || ""}
          src={auth.currentUser.photoURL || ""}
        >
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
        <Flex flexDir={"column"}>
          <Text>{auth.currentUser.displayName || ""}</Text>
        </Flex>
        <Link to={'/profile'} onClick={close}>
          <Button size={"sm"}>Profile</Button>
        </Link>
      </Flex>
      <Flex gap={1}>
        <Link to={"/login"} onClick={close}>
          <Button size={"sm"}>Login</Button>
        </Link>
        <Button size={"sm"} onClick={() => {
          logOut()
          close()
        }}>Logout</Button>
      </Flex>
    </Flex>
  );
};
