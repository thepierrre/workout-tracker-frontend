import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

import Container from "./Container";

interface Props {
  mt?: number;
  mb?: number;
}

const SpinnerComponent: React.FC<Props> = ({ mt = 60, mb = 0 }) => {
  return (
    <Container>
      <Flex direction="column" align="center" mt={mt} mb={mb} h="100%">
        <Spinner />
      </Flex>
    </Container>
  );
};

export default SpinnerComponent;
