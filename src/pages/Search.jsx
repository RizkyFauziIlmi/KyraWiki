import React from "react";
import { useEffect } from "react";
import {
  Grid,
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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  Tooltip,
  SliderThumb,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { search } from "../utils/fetch";
import { SettingsIcon } from "@chakra-ui/icons";
import { Result } from "../components/Result";

export const Search = () => {
  const { q } = useParams();
  const [anime, setAnime] = React.useState([]);
  const [manga, setManga] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState("popularity");
  const [adult, setAdult] = useBoolean(false);
  const [sort, setSort] = React.useState("asc");
  const [type, setType] = React.useState("all");
  const [limit, setLimit] = React.useState(50);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [minScore, setMinScore] = React.useState(0)
  const [maxScore, setMaxScore] = React.useState(10)
  const [status, setStatus] = React.useState("not_specified")
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
    search(q, setAnime, adult, orderBy, sort, type, limit, minScore, maxScore, status, true)
  }, [adult, limit, maxScore, minScore, orderBy, q, sort, status, type]);

  return (
    <Box p={5}>
      <Flex justifyContent={"center"} alignItems={"center"} gap={2} pb={2}>
        <Heading size={"sm"}>
          ({anime.length + manga.length}) Result for '{q}'{" "}
        </Heading>
        <Button
          size={"sm"}
          onClick={onOpen}
          variant={"solid"}
          leftIcon={<SettingsIcon />}
        >
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
              <Radio value="popularity">Popularity</Radio>
              <Radio value="rank">Rank</Radio>
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
            <Heading size={"sm"}>Status : </Heading>
            <RadioGroup name="status" onChange={setStatus} value={status}>
              <Radio value="not_specified">Not Specified</Radio>
              <Radio value="airing">Airing</Radio>
              <Radio value="complete">Complete</Radio>
              <Radio value="upcoming">Upcoming</Radio>
            </RadioGroup>
            <Heading size={"sm"}>Sort : </Heading>
            <RadioGroup name="sort" onChange={setSort} value={sort}>
              <Radio value="asc">Asc</Radio>
              <Radio value="desc">Desc</Radio>
            </RadioGroup>
            <Heading size={"sm"}>Type : </Heading>
            <RadioGroup name="type" onChange={setType} value={type}>
              <Radio value="all">All</Radio>
              <Radio value="tv">TV</Radio>
              <Radio value="movie">Movie</Radio>
              <Radio value="ova">OVA</Radio>
              <Radio value="special">Special</Radio>
              <Radio value="ona">ONA</Radio>
              <Radio value="music">Music</Radio>
            </RadioGroup>
            <Heading size={"sm"}>Adult Content : </Heading>
            <Switch
              isChecked={adult ? true : false}
              onChange={setAdult.toggle}
            />
            <Heading size={"sm"}>Limit : </Heading>
            <Slider
              id="limit"
              value={limit}
              min={0}
              max={100}
              step={1}
              onChange={(event) => setLimit(event)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <Tooltip
                hasArrow
                placement="right-end"
                isOpen={showTooltip}
                label={`${limit}`}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
            <Heading size={"sm"}>Score : ({`${minScore} - ${maxScore}`})</Heading>
            <RangeSlider
              defaultValue={[minScore, maxScore]}
              min={0}
              max={10}
              step={0.1}
              minStepsBetweenThumbs={2}
              onChange={([minScore, maxScore]) => {
                setMinScore(minScore)
                setMaxScore(maxScore)
              }}
            >
              <RangeSliderTrack bg="red.100">
                <RangeSliderFilledTrack bg={"tomato"} />
              </RangeSliderTrack>
              <RangeSliderThumb boxSize={6} index={0} />
              <RangeSliderThumb boxSize={6} index={1} />
            </RangeSlider>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Grid templateColumns={gridTemplate} gap={6}>
        {anime.map((data) => {
          return (
            <Result
              data={data}
              key={data.synopsis === null ? data.url : data.synopsis}
            />
          );
        })}
        {manga.map((data) => {
          return (
            <Result
              data={data}
              key={data.synopsis === null ? data.url : data.synopsis}
            />
          );
        })}
      </Grid>
    </Box>
  );
};
