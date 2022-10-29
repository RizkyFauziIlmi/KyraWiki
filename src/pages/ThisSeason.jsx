import { Text } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { GridPhoto } from "../components/GridPhoto";

export const ThisSeason = () => {
  const [clock, setClock] = React.useState()

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
      <Text opacity={0.8} fontSize={'xs'} textAlign={'center'}>{clock}</Text>
      <GridPhoto query="https://api.jikan.moe/v4/seasons/now" title="this season" subTitle={`(${new Date().getFullYear()})`} /> 
    </>
  )
}

