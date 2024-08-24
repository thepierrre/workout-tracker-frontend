import { Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

import Container from "./Container";

interface Props {
  mt?: number;
  mb?: number;
  text?: string;
  w?: string;
}

const SpinnerComponent: React.FC<Props> = ({
  mt = 60,
  mb = 0,
  text = "",
  w = "",
}) => {
  return (
    <Container>
      <Flex
        direction="column"
        align="center"
        mt={mt}
        mb={mb}
        m={0}
        p={0}
        h="100%"
        gap={2}
        w={w}
      >
        <Spinner />
        {text && <Text>{text}</Text>}
      </Flex>
    </Container>
  );
};

export default SpinnerComponent;
