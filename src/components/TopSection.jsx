import React from "react";
import {
  Heading,
  Flex,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const TopSection = ({
  datas,
  heading,
  urlCategory,
  anime,
  chara,
  manga,
  people,
}) => {
  const height = useBreakpointValue(
    {
      base: "130px",
      md: "300px",
    },
    {
      fallback: "md",
    }
  );
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
      md: "0.8"
    },
    {
      fallback: "md"
    }
  )

  return (
    <>
      <Heading pt={5}>{heading}</Heading>
      <Flex justifyContent={"center"}>
        {datas.map((data) => {
          return (
            <Link
              className="link"
              to={`../${urlCategory}/${data.mal_id}`}
              key={data.url}
              relative={"path"}
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
                  opacity={opacity}
                  _hover={{ opacity: 1 }}
                />
                <Text
                  width={width}
                  fontWeight={"bold"}
                  fontSize={"xs"}
                  textAlign={"center"}
                >
                  {chara === true ? `${data.name} (${data.name_kanji})` : ""}
                  {anime === true ? `${data.title} (${data.score})` : ""}
                  {manga === true ? `${data.title} (${data.score})` : ""}
                  {people === true ? `${data.name} (${data.favorites})` : ""}
                </Text>
              </Flex>
            </Link>
          );
        })}
      </Flex>
    </>
  );
};
