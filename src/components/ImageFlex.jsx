import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { todayString } from "../utils/todayString";

export const ImageFlex = ({ datas, url = "anime", title }) => {
  const [limiter, setLimiter] = React.useState(3000);

  const limiterValue = () => {
    if (todayString() === "sunday") {
      setLimiter(3000);
    } else if (todayString() === "monday") {
      setLimiter(14500);
    } else if (todayString() === "teusday") {
      setLimiter(13000);
    } else if (todayString() === "wednesday") {
      setLimiter(3000);
    } else if (todayString() === "thursday") {
        setLimiter(12000);
    } else if (todayString() === "friday") {
        setLimiter(7000);
    } else if (todayString() === "other") {
        setLimiter(14500);
    }
  };

  useEffect(() => {
    limiterValue();
  }, []);

  return (
    <>
      <Heading textAlign={"center"} pb={3}>
        {title}
      </Heading>
      <Flex justifyContent={"center"}>
        {datas.map((data) => {
          return data.rank <= limiter && data.rank !== 0 ? (
            <Link
              className="link"
              to={`../${url}/${data.mal_id}`}
              relative="path"
              key={data.synopsis === null ? data.url : data.synopsis}
            >
              <Image
                width={"max-content"}
                height={"130px"}
                src={data.images.jpg.image_url}
              />
              <Text fontWeight={"bold"} fontSize={"xs"} textAlign={"center"}>
                {data.title}
              </Text>
            </Link>
          ) : (
            ""
          );
        })}
      </Flex>
    </>
  );
};
