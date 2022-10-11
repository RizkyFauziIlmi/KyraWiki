import React from "react";
import { Link } from "react-router-dom";
import { Heading, UnorderedList, ListItem, Text } from "@chakra-ui/react";

export const Relations = ({ datas }) => {
  return (
    <>
      <Heading textAlign={"center"} size={"md"} pt={5}>
        Relations
      </Heading>
      <UnorderedList>
        {datas.relations.map((relation) => {
          return (
            <ListItem key={relation.relation}>
              <Text>
                {`${relation.relation} : `}
                <Link
                  to={
                    relation.entry[0].type === "anime"
                      ? `../${relation.entry[0].mal_id}`
                      : `../../manga/${relation.entry[0].mal_id}`
                  }
                  relative="path"
                >
                  <Text>
                    {relation.entry[0].name} ({`${relation.entry[0].type}`})
                  </Text>
                </Link>
              </Text>
            </ListItem>
          );
        })}
      </UnorderedList>
    </>
  );
};
