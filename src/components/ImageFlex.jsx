import {
  Flex,
  Heading,
  Image,
  Skeleton,
  SkeletonText,
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
  isLoaded = false,
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
  const opacity = useBreakpointValue(
    {
      base: "1",
      md: "0.8",
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
                <Skeleton isLoaded={isLoaded} >
                  <Image
                    width={width}
                    height={height}
                    src={data.images.jpg.image_url}
                    opacity={opacity}
                    _hover={{ opacity: 1 }}
                  />
                </Skeleton>
                <SkeletonText isLoaded={isLoaded} >
                  <Text
                    width={width}
                    fontWeight={"bold"}
                    fontSize={"xs"}
                    textAlign={"center"}
                  >
                    {data.title}
                  </Text>
                </SkeletonText>
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
