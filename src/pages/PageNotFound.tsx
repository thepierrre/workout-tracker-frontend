import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import notfound from "../../public/notfound.png";
import Container from "../components/UI/Container";
import MainHeading from "../components/UI/text/MainHeading";

const PageNotFound = () => {
  return (
    <Container>
      <Flex direction="column" align="center" minH="90vh">
        <MainHeading text="This page took a rest day!" />
        <Image w="200px" src={notfound} />
        <Text fontSize="xl" mb={4} textAlign="center">
          Looks like this page doesn't exist.
        </Text>
        <Text fontSize="xl" textAlign="center">
          Let's get you back to a page
          <br />
          that's ready to work!
        </Text>
        <Box mt="auto" mb={2}>
          <Link to="https://www.flaticon.com/free-icon/404_868792?term=404&page=1&position=27&origin=search&related_id=868792">
            <Text color="lightblue" fontWeight="bold" fontSize="xs">
              Image source
            </Text>
          </Link>
        </Box>
      </Flex>
    </Container>
  );
};

export default PageNotFound;
