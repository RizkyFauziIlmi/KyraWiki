import { EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  Heading,
  InputLeftElement,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, provider } from "../firebase/firebase-config";

export const Register = () => {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const toast = useToast();

  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      toast({
        title: "Success Create an Account",
        status: "success",
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Register Failed",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
    if (
      auth.currentUser.metadata.creationTime ===
      auth.currentUser.metadata.lastSignInTime
    ) {
      await setDoc(doc(db, "infoAccount", auth.currentUser.email), {
        favorites: [],
        wacthing: [],
        completed: [],
      });
      console.log(auth.currentUser.metadata.creationTime, auth.currentUser.metadata.lastSignInTime,": baru")
    } else {
      console.log(auth.currentUser.metadata.creationTime, auth.currentUser.metadata.lastSignInTime,": lama")
    }
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, provider).then(() => {
      toast({
        title: "Success Login",
        status: "success",
        isClosable: true,
      });
      navigate("/profile");
    });
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      p={5}
    >
      <Flex boxShadow={"dark-lg"} flexDir={"column"} p={10} gap={5}>
        <Heading textAlign={"center"}>Register Now</Heading>
        <Flex flexDir={"column"} gap={1}>
          <FormControl isRequired isInvalid={email === "" ? true : false}>
            <InputGroup>
              <InputLeftElement
                pointerEvents={"none"}
                children={<EmailIcon />}
              />
              <Input
                type={"email"}
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl
            isRequired
            isInvalid={
              password !== confirmPassword ||
              (password.length < 6 && confirmPassword.length < 6)
                ? true
                : false
            }
          >
            <InputGroup>
              <InputLeftElement
                pointerEvents={"none"}
                children={show ? <ViewIcon /> : <ViewOffIcon />}
              />
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                min={6}
                onChange={(event) => setpassword(event.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement
                pointerEvents={"none"}
                children={show ? <ViewIcon /> : <ViewOffIcon />}
              />
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter confirm password"
                min={6}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </InputGroup>
          </FormControl>
          <Flex flexDir={"column"}>
            <Button mt={2} onClick={createAccount}>
              Create an Account
            </Button>
            <Text fontWeight={"bold"} textAlign={"center"}>
              -OR-
            </Text>
            <Flex>
              <Button leftIcon={<FcGoogle />} width={'100%'} onClick={loginWithGoogle}>
                Login With Google
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex gap={1} flexDir={'column'} alignItems={'center'} justifyContent={"center"}>
          <Text opacity={0.5}>Already have an account?</Text>
          <Link to={"../login"} relative="path">
            <Text as={"u"}>Login Now!</Text>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
