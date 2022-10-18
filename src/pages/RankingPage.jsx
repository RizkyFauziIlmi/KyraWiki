import React from "react";
import { Ranking } from "../components/Ranking";
import { useEffect } from "react";
import { getTop } from "../utils/fetch";
import { useParams } from "react-router-dom";

export const RankingPage = () => {
  const [datas, setDatas] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { category } = useParams();

  useEffect(() => {
    getTop(category, setDatas, false, setIsLoaded, 100);
  }, [category]);

  return (
    <>
      <Ranking datas={datas} isLoaded={isLoaded} category={category} />
    </>
  );
};
