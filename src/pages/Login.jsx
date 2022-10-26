import { EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLoginButton } from "../components/GoogleLoginButton";
import { auth, db } from "../firebase/firebase-config";

export const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setpassword] = React.useState("");

  const loginwithEmail = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Success Login",
        status: "success",
        isClosable: true,
      });
      await setDoc(doc(db, "infoAccount", email), {
          favorites: [],
          wacthing: [],
          completed: []
      }).finally(() => {
        localStorage.setItem("email", email)
        navigate("/profile");
      })
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      p={5}
    >
      <Flex boxShadow={"dark-lg"} flexDir={"column"} p={10} gap={5}>
        <Heading textAlign={"center"}>Login Now</Heading>
        <FormControl>
          <InputGroup mb={1}>
            <InputLeftElement pointerEvents={"none"} children={<EmailIcon />} />
            <Input
              type={"email"}
              placeholder="Enter email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents={"none"}
              children={show ? <ViewIcon /> : <ViewOffIcon />}
            />
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={(event) => setpassword(event.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button onClick={loginwithEmail} width={'100%'} mt={2}>Login</Button>
          <Text fontWeight={'bold'} textAlign={'center'}>-OR-</Text>
          <GoogleLoginButton />
        </FormControl>
        <Flex gap={1} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
          <Text textAlign={"center"} opacity={0.5}>
            Don't have an account yet?
          </Text>
          <Link to={"../register"} relative="path">
            <Text as={"u"}>Register Now!</Text>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
