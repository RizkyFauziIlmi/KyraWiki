import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Skeleton,
} from "@chakra-ui/react";
import { HeadSection } from "../components/HeadSection";
import { Synopsis } from "../components/Synopsis";
import { Background } from "../components/Background";
import { Relations } from "../components/Relations";
import { getByIdFull } from "../utils/fetch";

export const Manga = () => {
  const [datas, setDatas] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { id } = useParams();

  useEffect(() => {
    getByIdFull(id, "manga", setDatas, false, setIsLoaded);
  }, [id]);

  const showContent = () => {
    if (datas !== undefined && datas.images !== undefined) {
      return (
        <Flex flexDir={"column"}>
          <HeadSection
            datas={datas}
            target={`../${datas.mal_id}`}
            isLoaded={isLoaded}
          />
          <Synopsis datas={datas} isLoaded={isLoaded} />
          <Background datas={datas} isLoaded={isLoaded} />
          <Skeleton isLoaded={isLoaded} >
            <TableContainer width={"100%"}>
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td>Type</Td>
                    <Td>{datas.type}</Td>
                  </Tr>
                  <Tr>
                    <Td>Status</Td>
                    <Td>{datas.status}</Td>
                  </Tr>
                  <Tr>
                    <Td>Chapters</Td>
                    <Td>{datas.chapters === null ? "-" : datas.chapters}</Td>
                  </Tr>
                  <Tr>
                    <Td>Volumes</Td>
                    <Td>{datas.volumes === null ? "-" : datas.volumes}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Skeleton>
          <Relations datas={datas} isLoaded={isLoaded} />
        </Flex>
      );
    } else {
      getByIdFull(id, "manga", setDatas);
    }
  };

  return showContent();
};
