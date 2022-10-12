import React from "react";
import { Heading, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const TopSection = ({ datas, heading, urlCategory, anime, chara, manga, people }) => {
  return (
    <>
      <Heading pt={5}>{heading}</Heading>
      <Flex justifyContent={'center'}>
        {datas.map((data) => {
          return (
            <Link
              className="link"
              to={`../${urlCategory}/${data.mal_id}`}
              key={data.url}
              relative={"path"}
            >
              <Image
                width={"max-content"}
                height={"130px"}
                src={data.images.jpg.image_url}
              />
              <Text fontWeight={"bold"} fontSize={"xs"} textAlign={"center"}>
                {chara === true ? `${data.name} (${data.name_kanji})` : ""}
                {anime === true ? `${data.title} (${data.score})` : ""}
                {manga === true ? `${data.title} (${data.score})` : ""}
                {people === true ? `${data.name} (${data.favorites})` : ""}
              </Text>
            </Link>
          );
        })}
      </Flex>
    </>
  );
};
