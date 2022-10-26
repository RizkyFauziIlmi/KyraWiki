import React from "react";
import {
  Image,
  Text,
  Heading,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Divider,
  useToast,
  Tag,
  StatArrow,
  VStack,
  Grid,
  GridItem,
  Skeleton,
  SkeletonText,
  Button,
} from "@chakra-ui/react";
import { StarIcon, ViewIcon } from "@chakra-ui/icons";
import { FcLikePlaceholder } from "react-icons/fc";
import { Link, useNavigate, useParams } from "react-router-dom";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase-config";
import { motion } from "framer-motion";

export const HeadSection = ({ datas, target, isLoaded }) => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const updateFavoriteList = async () => {
    if (auth.currentUser !== null) {
      await updateDoc(
        doc(db, "infoAccount", localStorage.getItem("email")),
        {
          favorites: arrayUnion({ status: true, mal_id: `${id}` }),
        }
      ).then(() => {
        toast({
          status: "success",
          title: "Added Successfully",
          description: `${datas.title} added to favorite list`,
          isClosable: true,
        });
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <VStack overflow={"hidden"}>
      <Link to={target} relative={"path"}>
        <SkeletonText noOfLines={2} isLoaded={isLoaded}>
          <Heading size={"lg"} cursor={"pointer"} textAlign={"center"}>
            {datas.title}
          </Heading>
        </SkeletonText>
      </Link>
      <Link to={target} relative={"path"}>
        <Skeleton isLoaded={isLoaded}>
          <Image
            src={datas.images.jpg.image_url}
            _hover={{ transform: "scale(1.01)" }}
            transition={"all 0.5s"}
            borderRadius={5}
            boxShadow={"dark-lg"}
            alt={datas.name}
          />
        </Skeleton>
      </Link>
      <Grid autoFlow={"column"} gap={0.5} alignItems={"center"}>
        {datas.genres.map((genre) => {
          return (
            <GridItem key={genre.name}>
              <Link to={genre.url} target={"_blank"}>
                <Skeleton isLoaded={isLoaded}>
                  <Tag size={"sm"} variant="solid" colorScheme="teal">
                    {genre.name}
                  </Tag>
                </Skeleton>
              </Link>
            </GridItem>
          );
        })}
      </Grid>
      <StatGroup gap={10} textAlign={"center"}>
        <Stat>
          <SkeletonText noOfLines={1} isLoaded={isLoaded}>
            <StatLabel>Score</StatLabel>
          </SkeletonText>
          <StatNumber>
            <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
              <Skeleton isLoaded={isLoaded}>
                <StarIcon />
              </Skeleton>
              <SkeletonText isLoaded={isLoaded} noOfLines={2}>
                <Text>{datas.score === null ? "-" : `${datas.score}/`}</Text>
              </SkeletonText>
              <SkeletonText noOfLines={1} isLoaded={isLoaded}>
                <Text
                  fontSize={"xx-small"}
                  opacity={0.5}
                  pt={"20px"}
                  textAlign={"left"}
                >{` ${datas.scored_by} users`}</Text>
              </SkeletonText>
            </Flex>
          </StatNumber>
        </Stat>
        <Stat>
          <SkeletonText noOfLines={1} isLoaded={isLoaded}>
            <StatLabel>Members</StatLabel>
          </SkeletonText>
          <StatNumber>
            <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
              <Skeleton isLoaded={isLoaded}>
                <ViewIcon />
              </Skeleton>
              <SkeletonText noOfLines={2} isLoaded={isLoaded}>
                <Text>{datas.members === null ? "-" : datas.members}</Text>
              </SkeletonText>
            </Flex>
          </StatNumber>
        </Stat>
        <Stat>
          <SkeletonText noOfLines={1} isLoaded={isLoaded}>
            <StatLabel>Rank</StatLabel>
          </SkeletonText>
          <StatNumber>
            <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
              <Skeleton isLoaded={isLoaded}>
                <StatArrow
                  type={datas.rank <= 1000 ? "increase" : "decrease"}
                />
              </Skeleton>
              <SkeletonText isLoaded={isLoaded} noOfLines={2}>
                <Text>{datas.rank === null ? "-" : datas.rank}</Text>
              </SkeletonText>
            </Flex>
          </StatNumber>
        </Stat>
      </StatGroup>
      <Divider />
      <Flex gap={1} justifyContent={"center"}>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            leftIcon={<FcLikePlaceholder />}
            size={"sm"}
            onClick={updateFavoriteList}
          >
            Favorite
          </Button>
        </motion.button>
      </Flex>
    </VStack>
  );
};
