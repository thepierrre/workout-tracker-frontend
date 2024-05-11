import { Card } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const CustomCard: React.FC<Props> = (props) => {
  return (
    <Card {...props} bg="#404040" w="95vw" p={0}>
      {props.children}
    </Card>
  );
};

export default CustomCard;
