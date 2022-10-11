import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  VStack,
  Flex,
  Td,
  Tr,
  Tbody,
  Tag,
  TagLabel,
  TableContainer,
  Table
} from "@chakra-ui/react";
import { HeadSection } from "../components/HeadSection";
import { OtherSection } from "../components/OtherSection";
import { Player } from "../components/Player";
import { Synopsis } from "../components/Synopsis";
import { Background } from "../components/Background";
import { Relations } from "../components/Relations";
import { Link } from "react-router-dom";
import { getByIdFull } from '../utils/fetch'

export const Anime = () => {
  const [datas, setDatas] = React.useState([]);
  const { id } = useParams();

  useEffect(() => {
    getByIdFull(id, 'anime', setDatas)
  }, [id]);

  const showContent = () => {
    if (datas !== undefined && datas.images !== undefined) {
      return (
        <Flex
          p={5}
          gap={10}
          flexDir={window.innerWidth <= 854 ? "column" : "row"}
        >
          <VStack>
            <HeadSection datas={datas} target={`../${datas.mal_id}`}/>
            {window.innerWidth <= 854 ? "" : <OtherSection datas={datas} />}
          </VStack>
          <Flex flexDir={"column"} width={"100%"}>
            <Player datas={datas} />
            <Synopsis datas={datas} />
            <Background datas={datas} />
            {window.innerWidth <= 854 ? <OtherSection datas={datas} /> : ""}
            <TableContainer>
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td>Type</Td>
                    <Td>{datas.type}</Td>
                  </Tr>
                  <Tr>
                    <Td>Source</Td>
                    <Td>{datas.source}</Td>
                  </Tr>
                  <Tr>
                    <Td>Status</Td>
                    <Td>{datas.status}</Td>
                  </Tr>
                  <Tr>
                    <Td>Episode</Td>
                    <Td isNumeric>{datas.episodes}</Td>
                  </Tr>
                  <Tr>
                    <Td>Duration</Td>
                    <Td isNumeric>
                      {datas.duration === null ? "-" : datas.duration}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Aired From</Td>
                    <Td isNumeric>
                      {datas.season === null ? "-" : datas.season}{" "}
                      {new Date(datas.aired.from).getFullYear()}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Studios</Td>
                    <Td>
                      {datas.studios.map((studio) => {
                        return (
                          <Link to={studio.url} key={studio.name}>
                            <Tag
                              size="lg"
                              colorScheme="red"
                              borderRadius="full"
                            >
                              <TagLabel>{studio.name}</TagLabel>
                            </Tag>
                          </Link>
                        );
                      })}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Relations datas={datas} />
          </Flex>
        </Flex>
      );
    } else {
      getByIdFull(id, 'anime', setDatas)
    }
  };

  return showContent();
};
