import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = (props) => {
  return (
    <Flex
      align="center"
      w="100vw"
      color="white"
      direction="column"
      gap={5}
      padding={2}
      marginTop={5}
      {...props}
    >
      {props.children}
    </Flex>
  );
};

export default Container;
