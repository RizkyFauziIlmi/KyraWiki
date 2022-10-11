import React from "react";
import {
  Flex,
  Heading,
  Input,
  IconButton,
  useColorMode,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const btnRef = React.useRef();
  const [q, setQ] = React.useState("");
  const searchRef = useRef(null)

  const changeValue = (event) => {
    setQ(event.target.value);
  };

  const keyboardHandle = (event) => {
    if (event.key === "Enter") {
      searchRef.current.focus();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyboardHandle)
    return () => window.removeEventListener('keydown', keyboardHandle)
  }, []);


  return (
    <Flex boxShadow={"dark-lg"} p={5} alignItems={"center"} gap={2}>
      <Link to="/">
        <Heading size={"md"}>KyraWiki</Heading>
      </Link>
      <InputGroup>
        <Input value={q} onChange={changeValue} />
        <InputRightElement>
          <Link to={`search/${q}`} target={"_self"}>
            <IconButton icon={<SearchIcon />} ref={searchRef} />
          </Link>
        </InputRightElement>
      </InputGroup>
      <IconButton
        icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
      />
      <IconButton ref={btnRef} icon={<HamburgerIcon />} onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        placement={"top"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Flex flexDir={"column"} gap={2}>
              <Link to="/random-generator">
                <Button>Random Generator</Button>
              </Link>
              <Link to="/anime-recommendation">
                <Button>Anime Recommendation</Button>
              </Link>
              <Link to="/top-all">
                <Button>Top of All</Button>
              </Link>
            </Flex>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
