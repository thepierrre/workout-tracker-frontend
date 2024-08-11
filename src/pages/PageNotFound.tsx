import { Image, Text } from "@chakra-ui/react";

import notfound from "../../public/notfound.png";
import Container from "../components/UI/Container";
import MainHeading from "../components/UI/text/MainHeading";

const PageNotFound = () => {
  return (
    <Container>
      <MainHeading text="This page took a rest day!" />
      <Image w="200px" src={notfound} />
      <Text fontSize="xl" mb={4}>
        Even pages need a break.
      </Text>
      <Text fontSize="xl" textAlign="center">
        Let's get you back to a page <br /> that's ready to work!
      </Text>
    </Container>
  );
};

export default PageNotFound;
