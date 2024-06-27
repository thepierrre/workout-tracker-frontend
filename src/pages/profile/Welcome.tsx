import { Heading, Text, Image } from "@chakra-ui/react";
import logo from "../../../public/logo.png";

const Welcome = () => {
  return (
    <>
      <Heading fontSize="4xl" mb={10}>
        Hello there!
      </Heading>
      <Text fontSize="xl" textAlign="center">
        Time for the gym?
        <br />
        Log in or create an account
        <br /> and start your workout!
      </Text>
      <Image w="170px" mt={10} mb={10} src={logo} />
    </>
  );
};

export default Welcome;
