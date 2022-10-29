import React from "react";
import { Ranking } from "../components/Ranking";
import { useParams } from "react-router-dom";

export const RankingPage = () => {
  const { category } = useParams();

  return (
    <>
      <Ranking category={category} />
    </>
  );
};
