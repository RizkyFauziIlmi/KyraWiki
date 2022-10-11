import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { HeadSection } from "../components/HeadSection";
import { Synopsis } from "../components/Synopsis";
import { Background } from "../components/Background";
import { Relations } from "../components/Relations";

export const Manga = () => {
  const [datas, setDatas] = React.useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getMangaById = async () => {
      const response = await axios.get(
        `https://api.jikan.moe/v4/manga/${id}/full`
      );
      setDatas(response.data.data);
    };

    getMangaById();
  }, [id]);

  const showContent = () => {
    if (datas !== undefined && datas.images !== undefined) {
      return (
        <Flex flexDir={'column'}>
          <HeadSection datas={datas} target={`../${datas.mal_id}`} />
          <Synopsis datas={datas} />
          <Background datas={datas} />
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
          <Relations datas={datas} />
        </Flex>
      );
    } else {
      const getMangaById = async () => {
        const response = await axios.get(
          `https://api.jikan.moe/v4/manga/${id}/full`
        );
        setDatas(response.data.data);
      };

      getMangaById();
    }
  };

  return showContent();
};
