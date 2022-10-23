import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { GridPhoto } from "../components/GridPhoto";
import { customDayString } from "../utils/customDayString";

export const Schedule = () => {
  const [day, setDay] = React.useState(new Date().getDay());
  const [clock, setClock] = React.useState("")


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

  const clockRefresh = () => {
    setInterval(() => {
      setClock(new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo", dateStyle: "full", timeStyle:  "full" }))
    }, 1000)
  }

  useEffect(() => {
    clockRefresh()
  }, [])

  return (
    <>
      <Heading textTransform={"uppercase"} textAlign={"center"}>
        Schedule 
      </Heading>
      <Text textAlign={'center'} fontWeight={'bold'} opacity={0.8} >{clock}</Text>
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
              column={1}
            />
          </TabPanel>
          <TabPanel>
            <GridPhoto
              query={`https://api.jikan.moe/v4/schedules?filter=${customDayString(
                day
              )}`}
              reverse={true}
              column={1}
            />
          </TabPanel>
          <TabPanel>
            <GridPhoto
              query={`https://api.jikan.moe/v4/schedules?filter=${customDayString(
                day
              )}`}
              reverse={true}
              column={1}
            />
          </TabPanel>
          <TabPanel>
            <GridPhoto
              query={`https://api.jikan.moe/v4/schedules?filter=${customDayString(
                day
              )}`}
              reverse={true}
              column={1}
            />
          </TabPanel>
          <TabPanel>
            <GridPhoto
              query={`https://api.jikan.moe/v4/schedules?filter=${customDayString(
                day
              )}`}
              reverse={true}
              column={1}
            />
          </TabPanel>
          <TabPanel>
            <GridPhoto
              query={`https://api.jikan.moe/v4/schedules?filter=${customDayString(
                day
              )}`}
              reverse={true}
              column={1}
            />
          </TabPanel>
          <TabPanel>
            <GridPhoto
              query={`https://api.jikan.moe/v4/schedules?filter=${customDayString(
                day
              )}`}
              reverse={true}
              column={1}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
