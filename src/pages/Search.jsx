import React from "react";
import {
  Box,
  useBreakpointValue,
  Heading,
  useDisclosure,
  Button,
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
  Collapse,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { SettingsIcon } from "@chakra-ui/icons";
import { Result } from "../components/Result";

export const Search = () => {
  const { q } = useParams();
  const [orderBy, setOrderBy] = React.useState("popularity");
  const [adult, setAdult] = useBoolean(false);
  const [sort, setSort] = React.useState("asc");
  const [type, setType] = React.useState("all");
  const [limit, setLimit] = React.useState(50);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [minScore, setMinScore] = React.useState(0);
  const [maxScore, setMaxScore] = React.useState(10);
  const [status, setStatus] = React.useState("not_specified");
  const { isOpen, onToggle } = useDisclosure();

  const width = useBreakpointValue(
    {
      base: "80vw",
      md: "30vw",
    },
    {
      fallback: "md",
    }
  );

  return (
    <Box p={5}>
      <Flex justifyContent={"center"} alignItems={"center"} gap={2} pb={2}>
        <Button
          size={"sm"}
          onClick={onToggle}
          variant={"solid"}
          leftIcon={<SettingsIcon />}
        >
          Filter
        </Button>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Flex width={"100%"} justifyContent={"center"}>
          <Box boxShadow={"dark-lg"} p={5} borderRadius={5} m={5} width={width}>
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
            <Heading size={"sm"}>
              Score : ({`${minScore} - ${maxScore}`})
            </Heading>
            <RangeSlider
              defaultValue={[minScore, maxScore]}
              min={0}
              max={10}
              step={0.1}
              minStepsBetweenThumbs={2}
              onChange={([minScore, maxScore]) => {
                setMinScore(minScore);
                setMaxScore(maxScore);
              }}
            >
              <RangeSliderTrack bg="red.100">
                <RangeSliderFilledTrack bg={"tomato"} />
              </RangeSliderTrack>
              <RangeSliderThumb boxSize={6} index={0} />
              <RangeSliderThumb boxSize={6} index={1} />
            </RangeSlider>
          </Box>
        </Flex>
      </Collapse>
      <Result
        query={q}
        adult={adult}
        limit={limit}
        type={type}
        order_by={orderBy}
        sort={sort}
        status={status}
        min_score={minScore}
        max_score={maxScore}
      />
    </Box>
  );
};
