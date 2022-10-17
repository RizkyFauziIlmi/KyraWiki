import {
  Flex,
  Heading,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { todayString } from "../utils/todayString";

export const ImageFlex = ({
  datas,
  url = "anime",
  title = "Title",
  linkTitle = "/",
}) => {
  const [limiter, setLimiter] = React.useState(3000);

  const height = useBreakpointValue(
    {
      base: "130px",
      md: "300px",
    },
    {
      fallback: "md",
    }
  );

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

  const width = useBreakpointValue(
    {
      base: "20vw",
      md: "15vw",
    },
    {
      fallback: "md",
    }
  );

  useEffect(() => {
    limiterValue();
  }, []);

  return (
    <>
      <Link to={linkTitle}>
        <Heading textAlign={"center"} pb={3}>
          {title}
        </Heading>
      </Link>
      <Flex justifyContent={"center"}>
        {datas.map((data) => {
          return data.rank <= limiter && data.rank !== 0 ? (
            <Link
              className="link"
              to={`../${url}/${data.mal_id}`}
              relative="path"
              key={data.synopsis === null ? data.url : data.synopsis}
            >
              <Flex
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image
                  width={width}
                  height={height}
                  src={data.images.jpg.image_url}
                />
                <Text
                  width={width}
                  fontWeight={"bold"}
                  fontSize={"xs"}
                  textAlign={"center"}
                >
                  {data.title}
                </Text>
              </Flex>
            </Link>
          ) : (
            ""
          );
        })}
      </Flex>
    </>
  );
};
