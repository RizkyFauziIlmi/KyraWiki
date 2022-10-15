import {
  Grid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { Result } from "../components/Result";
import { customDayString } from "../utils/customDayString";
import { getSchedules } from "../utils/fetch";

export const Schedule = () => {
  const [datas, setDatas] = React.useState([]);
  const [day, setDay] = React.useState(new Date().getDay());

  const gridTemplate = useBreakpointValue(
    {
      base: "repeat(2, 1fr)",
      md: "repeat(6, 1fr)",
    },
    {
      fallback: "md",
    }
  );

  const orientaion = useBreakpointValue(
    {
        base: "vertical",
        md: "horizontal"
    },
    {
        fallback: 'md'
    }
  )

  const align = useBreakpointValue(
    {
        base: "start",
        md: "center"
    },
    {
        fallback: "md"
    }
  )

  useEffect(() => {
    getSchedules(setDatas, false, customDayString(day), -1);
  }, [datas, day]);

  return (
    <Tabs
      pt={5}
      align={align}
      orientation={orientaion}
      variant={'line'}
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
          <Grid templateColumns={gridTemplate} gap={6}>
            {datas.reverse().map((data) => {
              return (
                <Result
                  data={data}
                  key={data.synopsis === null ? data.url : data.synopsis}
                />
              );
            })}
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid templateColumns={gridTemplate} gap={6}>
            {datas.reverse().map((data) => {
              return (
                <Result
                  data={data}
                  key={data.synopsis === null ? data.url : data.synopsis}
                />
              );
            })}
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid templateColumns={gridTemplate} gap={6}>
            {datas.reverse().map((data) => {
              return (
                <Result
                  data={data}
                  key={data.synopsis === null ? data.url : data.synopsis}
                />
              );
            })}
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid templateColumns={gridTemplate} gap={6}>
            {datas.reverse().map((data) => {
              return (
                <Result
                  data={data}
                  key={data.synopsis === null ? data.url : data.synopsis}
                />
              );
            })}
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid templateColumns={gridTemplate} gap={6}>
            {datas.reverse().map((data) => {
              return (
                <Result
                  data={data}
                  key={data.synopsis === null ? data.url : data.synopsis}
                />
              );
            })}
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid templateColumns={gridTemplate} gap={6}>
            {datas.reverse().map((data) => {
              return (
                <Result
                  data={data}
                  key={data.synopsis === null ? data.url : data.synopsis}
                />
              );
            })}
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid templateColumns={gridTemplate} gap={6}>
            {datas.reverse().map((data) => {
              return (
                <Result
                  data={data}
                  key={data.synopsis === null ? data.url : data.synopsis}
                />
              );
            })}
          </Grid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
