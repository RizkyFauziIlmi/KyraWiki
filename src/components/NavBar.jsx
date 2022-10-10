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

export const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const btnRef = React.useRef();
  const [q, setQ] = React.useState("");

  const changeValue = (event) => {
    setQ(event.target.value);
  };

  return (
    <Flex boxShadow={"dark-lg"} p={5} alignItems={"center"} gap={2}>
      <Link to="/">
        <Heading size={"md"}>KyraWiki</Heading>
      </Link>
      <InputGroup>
        <Input value={q} onChange={changeValue}/>
        <InputRightElement>
          <Link to={`search/${q}`} target={'_self'}>
            <IconButton icon={<SearchIcon />} />
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
            </Flex>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
