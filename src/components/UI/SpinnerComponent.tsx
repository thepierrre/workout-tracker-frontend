import Container from "./Container";
import { Flex, Spinner } from "@chakra-ui/react";

const SpinnerComponent = () => {
  return (
    <Container>
      <Flex direction="column" align="center" mt="15rem" h="100%">
        <Spinner />
      </Flex>
    </Container>
  );
};

export default SpinnerComponent;
