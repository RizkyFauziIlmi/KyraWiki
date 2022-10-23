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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
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
                <AccordionPanel pb={4}>
                  <Link to="/ranking">
                    <Button variant={'ghost'}>All Ranking</Button>
                  </Link>
                  <Link to="ranking/anime">
                    <Button variant={'ghost'}>Anime Ranking</Button>
                  </Link>
                  <Link to="ranking/manga">
                    <Button variant={'ghost'}>Manga Ranking</Button>
                  </Link>
                  <Link to="ranking/characters">
                    <Button variant={'ghost'}>Characters Ranking</Button>
                  </Link>
                  <Link to="ranking/people">
                    <Button variant={'ghost'}>People Ranking</Button>
                  </Link>
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
                  <Link to="/anime-recommendation">
                    <Button variant={'ghost'}>Anime Recommendation</Button>
                  </Link>
                  <Link to="/schedule">
                    <Button variant={'ghost'}>Schedule</Button>
                  </Link>
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
                  <Link to="/random-generator">
                    <Button variant={'ghost'}>Random Generator</Button>
                  </Link>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
