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
import { Result } from "../components/Result";
import { FcFilledFilter } from "react-icons/fc";

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
          leftIcon={<FcFilledFilter />}
        >
          Filter
        </Button>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Flex width={"100%"} justifyContent={"center"}>
          <Box boxShadow={"dark-lg"} p={10} borderRadius={5} m={5} width={width}>
            <Heading size={"sm"}>Order By :</Heading>
            <RadioGroup
              mb={"1rem"}
              gap={10}
              name="order-by"
              onChange={setOrderBy}
              value={orderBy}
            >
              <Radio mr={"0.5rem"} value="popularity">
                Popularity
              </Radio>
              <Radio mr={"0.5rem"} value="rank">
                Rank
              </Radio>
              <Radio mr={"0.5rem"} value="members">
                Members
              </Radio>
              <Radio mr={"0.5rem"} value="type">
                Type
              </Radio>
              <Radio mr={"0.5rem"} value="title">
                Title
              </Radio>
              <Radio mr={"0.5rem"} value="rating">
                Rating
              </Radio>
              <Radio mr={"0.5rem"} value="favorites">
                Favorites
              </Radio>
              <Radio mr={"0.5rem"} value="score">
                Score
              </Radio>
              <Radio mr={"0.5rem"} value="mal_id">
                Mal Id
              </Radio>
              <Radio mr={"0.5rem"} value="episodes">
                Episodes
              </Radio>
              <Radio mr={"0.5rem"} value="start_date">
                Start Date
              </Radio>
              <Radio mr={"0.5rem"} value="end_date">
                End Date
              </Radio>
              <Radio mr={"0.5rem"} value="scored_by">
                Scored By
              </Radio>
            </RadioGroup>
            <Heading size={"sm"}>Status : </Heading>
            <RadioGroup
              mb={"1rem"}
              name="status"
              onChange={setStatus}
              value={status}
            >
              <Radio mr={"0.5rem"} value="not_specified">
                Not Specified
              </Radio>
              <Radio mr={"0.5rem"} value="airing">
                Airing
              </Radio>
              <Radio mr={"0.5rem"} value="complete">
                Complete
              </Radio>
              <Radio mr={"0.5rem"} value="upcoming">
                Upcoming
              </Radio>
            </RadioGroup>
            <Heading size={"sm"}>Sort : </Heading>
            <RadioGroup mb={"1rem"} name="sort" onChange={setSort} value={sort}>
              <Radio mr={"0.5rem"} value="asc">
                Asc
              </Radio>
              <Radio mr={"0.5rem"} value="desc">
                Desc
              </Radio>
            </RadioGroup>
            <Heading size={"sm"}>Type : </Heading>
            <RadioGroup mb={"1rem"} name="type" onChange={setType} value={type}>
              <Radio mr={"0.5rem"} value="all">
                All
              </Radio>
              <Radio mr={"0.5rem"} value="tv">
                TV
              </Radio>
              <Radio mr={"0.5rem"} value="movie">
                Movie
              </Radio>
              <Radio mr={"0.5rem"} value="ova">
                OVA
              </Radio>
              <Radio mr={"0.5rem"} value="special">
                Special
              </Radio>
              <Radio mr={"0.5rem"} value="ona">
                ONA
              </Radio>
              <Radio mr={"0.5rem"} value="music">
                Music
              </Radio>
            </RadioGroup>
            <Flex alignItems={'center'} gap={'0.5rem'} mb={'1rem'}>
              <Heading size={"sm"}>Adult Content : </Heading>
              <Switch
                isChecked={adult ? true : false}
                onChange={setAdult.toggle}
              />
            </Flex>
            <Heading size={"sm"}>Limit : </Heading>
            <Slider
              id="limit"
              value={limit}
              min={0}
              max={100}
              step={1}
              mb={'1rem'}
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
