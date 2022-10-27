import { Button, useToast } from "@chakra-ui/react";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { auth, db, provider } from "../firebase/firebase-config";

export const GoogleLoginButton = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then(() => {
        toast({
          title: "Login Successful",
          status: "success",
          isClosable: true,
        });
      })
      .finally(() => {
        localStorage.setItem("email", auth.currentUser.email);
        navigate("/profile");
      });
      if (
        auth.currentUser.metadata.creationTime ===
        auth.currentUser.metadata.lastSignInTime
      ) {
        await setDoc(doc(db, "infoAccount", auth.currentUser.email), {
          favorites: [],
          wacthing: [],
          completed: [],
        });
      }
  };
  return (
    <>
      <Button leftIcon={<FcGoogle />} width={"100%"} onClick={loginWithGoogle}>
        Login With Google
      </Button>
    </>
  );
};
