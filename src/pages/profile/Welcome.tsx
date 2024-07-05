import { Heading, Text, Image } from "@chakra-ui/react";
import logo from "/logo.png";

const Welcome = () => {
  return (
    <>
      <Heading fontSize="4xl" mb={12}>
        Hello there!
      </Heading>
      <Text fontSize="xl" textAlign="center" mb={1} fontWeight="bold">
        Time for the gym?
      </Text>
      <Text fontSize="xl" textAlign="center">
        Log in or create an account
        <br /> and start your workout!
      </Text>
      <Image w="170px" mt={10} mb={10} src={logo} />
    </>
  );
};

export default Welcome;
