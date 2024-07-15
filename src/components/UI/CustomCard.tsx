import { Card, BoxProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props extends BoxProps {
  children: ReactNode;
}

const CustomCard: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <Card
      {...rest}
      bg="#404040"
      w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
      p={0}
    >
      {children}
    </Card>
  );
};

export default CustomCard;
