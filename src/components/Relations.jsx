import React from "react";
import { Link } from "react-router-dom";
import {
  Heading,
  UnorderedList,
  ListItem,
  Text,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

export const Relations = ({ datas, isLoaded }) => {
  return (
    <>
      <Skeleton mt={2} isLoaded={isLoaded}>
        <Heading textAlign={"center"} size={"md"} pt={5}>
          Relations
        </Heading>
      </Skeleton>
      <UnorderedList>
        {datas.relations.map((relation) => {
          return (
            <SkeletonText isLoaded={isLoaded} mt={1} noOfLines={1} key={relation.relation}>
              <ListItem>
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
            </SkeletonText>
          );
        })}
      </UnorderedList>
    </>
  );
};
