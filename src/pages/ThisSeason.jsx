import React from "react";
import { GridPhoto } from "../components/GridPhoto";

export const ThisSeason = () => {
  return (
    <>
    <GridPhoto query="https://api.jikan.moe/v4/seasons/now" title="this season" subTitle={` (${new Date().getFullYear()})`} /> 
    </>
  )
}

