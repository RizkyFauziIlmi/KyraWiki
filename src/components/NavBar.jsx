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
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  InputGroup,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  InputRightElement,
  HStack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { UserLog } from "./UserLog";

export const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const btnRef = React.useRef();
  const [q, setQ] = React.useState("");
  const searchRef = useRef(null);

  const changeValue = (event) => {
    setQ(event.target.value);
  };

  const keyboardHandle = (event) => {
    if (event.key === "Enter") {
      searchRef.current.focus();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyboardHandle);
    return () => window.removeEventListener("keydown", keyboardHandle);
  }, []);

  return (
    <Flex boxShadow={"dark-lg"} p={5} alignItems={"center"} gap={2}>
      <Link to="/">
        <Heading size={"md"}>KyraWiki</Heading>
      </Link>
      <InputGroup>
        <Input placeholder="Search anime..." value={q} onChange={changeValue} />
        <InputRightElement width='3rem'>
          <Link to={`search/${q}`} target={"_self"}>
            <IconButton size={'sm'} height={'1.75rem'} icon={<SearchIcon />} ref={searchRef} />
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
            <UserLog close={onClose} />
            <Accordion defaultIndex={0}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Ranking
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} overflowX={'auto'}>
                  <HStack>
                    <Link to="/ranking">
                      <Button>All Ranking</Button>
                    </Link>
                    <Link to="ranking/anime">
                      <Button>Anime Ranking</Button>
                    </Link>
                    <Link to="ranking/manga">
                      <Button>Manga Ranking</Button>
                    </Link>
                    <Link to="ranking/characters">
                      <Button>Characters Ranking</Button>
                    </Link>
                    <Link to="ranking/people">
                      <Button>People Ranking</Button>
                    </Link>
                  </HStack>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Tools
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <HStack overflowX={'auto'}>
                    <Link to="/anime-recommendation">
                      <Button>Anime Recommendation</Button>
                    </Link>
                    <Link to="/schedule">
                      <Button>Schedule</Button>
                    </Link>
                  </HStack>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Other
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <HStack overflowX={'auto'}>
                    <Link to="/random-generator">
                      <Button>Random Generator</Button>
                    </Link>
                  </HStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
