import React from "react";
import { useEffect } from "react";
import {
  Text,
  Image,
  Grid,
  GridItem,
  Box,
  useBreakpointValue,
  Heading,
  useDisclosure,
  Button,
  ModalOverlay,
  ModalHeader,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  RadioGroup,
  Radio,
  useBoolean,
  Switch,
} from "@chakra-ui/react";
import { useParams, Link} from "react-router-dom";
import { search } from "../utils/fetch";
import { SettingsIcon } from "@chakra-ui/icons";

export const Search = () => {
  const { q } = useParams();
  const [anime, setAnime] = React.useState([]);
  const [manga, setManga] = React.useState([]);
  const [limit, setLimit] = React.useState(100);
  const [orderBy, setOrderBy] = React.useState("rank");
  const [adult, setAdult] = useBoolean(true)
  const [sort, setSort] = React.useState("asc")
  const { isOpen, onOpen, onClose } = useDisclosure();

  const gridTemplate = useBreakpointValue(
    {
      base: "repeat(2, 1fr)",
      md: "repeat(6, 1fr)",
    },
    {
      fallback: "md",
    }
  );

  useEffect(() => {
    search(q, setAnime, setManga, limit, orderBy, sort);
    
  }, [limit, orderBy, q, sort])

  return (
    <Box p={5}>
      <Flex justifyContent={"center"} width={"100vw"} gap={2}>
        <Heading textAlign={"center"} pb={5}>
          ({anime.length + manga.length}) Result for '{q}'{" "}
        </Heading>
        <Button onClick={onOpen} variant={"solid"} leftIcon={<SettingsIcon />}>
          Filter
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Filter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size={"sm"}>Order By :</Heading>
            <RadioGroup name="order-by" onChange={setOrderBy} value={orderBy}>
              <Radio value="rank">Rank</Radio>
              <Radio value="popularity">Popularity</Radio>
              <Radio value="members">Members</Radio>
              <Radio value="type">Type</Radio>
              <Radio value="title">Title</Radio>
              <Radio value="rating">Rating</Radio>
              <Radio value="favorites">Favorites</Radio>
              <Radio value="score">Score</Radio>
              <Radio value="mal_id">Mal Id</Radio>
              <Radio value="episodes">Episodes</Radio>
              <Radio value="start_date">Start Date</Radio>
              <Radio value="end_date">End Date</Radio>
              <Radio value="scored_by">Scored By</Radio>
            </RadioGroup>
            <Heading size={'sm'}>Adult Content Filter : </Heading>
            <Switch isChecked={adult ? true : false} onChange={setAdult.toggle}/>
            <Heading size={'sm'}>Sort : </Heading>
            <RadioGroup name="sort" onChange={setSort} value={sort}>
              <Radio value="desc">Desc</Radio>
              <Radio value="asc">Asc</Radio>
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}> 
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Grid templateColumns={gridTemplate} gap={6}>
        {anime.map((data) => {
          return (
            <GridItem key={data.synopsis === null ? data.url : data.synopsis} textAlign={"center"}>
              <Link to={`../../anime/${data.mal_id}`} relative="path">
                <Box>
                  <Image
                    alt={data.title}
                    width={"200px"}
                    height={"300px"}
                    src={data.images.jpg.large_image_url}
                    _hover={{ transform: "scale(1.05)" }}
                    transition={"all 0.5s"}
                    borderRadius={5}
                    boxShadow={"dark-lg"}
                  />
                  <Text fontWeight={"bold"} pt={3} fontSize={"sm"}>
                    {data.title}
                  </Text>
                </Box>
              </Link>
            </GridItem>
          );
        })}
        {manga.map((data) => {
          return (
            <GridItem key={data.synopsis === null ? data.url : data.synopsis} textAlign={"center"}>
              <Link to={`../../manga/${data.mal_id}`} relative="path">
                <Box>
                  <Image
                    alt={data.title}
                    width={"200px"}
                    height={"300px"}
                    src={data.images.jpg.large_image_url}
                    _hover={{ transform: "scale(1.05)" }}
                    transition={"all 0.5s"}
                    borderRadius={5}
                    boxShadow={"dark-lg"}
                  />
                  <Text fontWeight={"bold"} pt={3} fontSize={"sm"}>
                    {data.title}
                  </Text>
                </Box>
              </Link>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};
