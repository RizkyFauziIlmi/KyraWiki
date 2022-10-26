import { Button, useToast } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase-config";

export const LogoutButton = ({ seconAction = null }) => {
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
        localStorage.removeItem("email")
        navigate("/");
      })
      .catch((error) => {
        toast({
          title: "Logout Failed",
          description: error.message,
          status: "error",
          isClosable: true,
        });
      })
  };

  return (
    <Button
      size={"sm"}
      onClick={() => {
        logOut();
        seconAction()
      }}
    >
      Logout
    </Button>
  );
};
