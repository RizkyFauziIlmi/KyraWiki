import {
  Grid,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { GridPhoto } from "../components/GridPhoto";
import { customDayString } from "../utils/customDayString";

export const Schedule = () => {
  const [day, setDay] = React.useState(new Date().getDay());

  const gridTemplate = useBreakpointValue(
    {
      base: "repeat(2, 1fr)",
      md: "repeat(5, 1fr)",
    },
    {
      fallback: "md",
    }
  );

  const orientaion = useBreakpointValue(
    {
      base: "vertical",
      md: "horizontal",
    },
    {
      fallback: "md",
    }
  );

  const align = useBreakpointValue(
    {
      base: "start",
      md: "center",
    },
    {
      fallback: "md",
    }
  );

  return (
    <>
      <Heading textTransform={"uppercase"} textAlign={"center"}>
        Schedule
      </Heading>
      <Tabs
        pt={5}
        align={align}
        orientation={orientaion}
        variant={"line"}
        isLazy
        onChange={(index) => setDay(index)}
        defaultIndex={new Date().getDay()}
      >
        <TabList>
          <Tab>Sunday</Tab>
          <Tab>Monday</Tab>
          <Tab>Tuesday</Tab>
          <Tab>Wednesday</Tab>
          <Tab>Thursday</Tab>
          <Tab>Friday</Tab>
          <Tab>Other</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <GridPhoto
              query={`https://api.jikan.moe/v4/schedules?filter=${customDayString(
                day
              )}`}
              reverse={true}
            />
          </TabPanel>
          <TabPanel>
            <GridPhoto
              query={`https://api.jikan.moe/v4/schedules?filter=${customDayString(
                day
              )}`}
              reverse={true}
            />
          </TabPanel>
          <TabPanel>
            <GridPhoto
              query={`https://api.jikan.moe/v4/schedules?filter=${customDayString(
                day
              )}`}
              reverse={true}
            />
          </TabPanel>
          <TabPanel>
            <GridPhoto
              query={`https://api.jikan.moe/v4/schedules?filter=${customDayString(
                day
              )}`}
              reverse={true}
            />
          </TabPanel>
          <TabPanel>
            <GridPhoto
              query={`https://api.jikan.moe/v4/schedules?filter=${customDayString(
                day
              )}`}
              reverse={true}
            />
          </TabPanel>
          <TabPanel>
            <GridPhoto
              query={`https://api.jikan.moe/v4/schedules?filter=${customDayString(
                day
              )}`}
              reverse={true}
            />
          </TabPanel>
          <TabPanel>
            <GridPhoto
              query={`https://api.jikan.moe/v4/schedules?filter=${customDayString(
                day
              )}`}
              reverse={true}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
