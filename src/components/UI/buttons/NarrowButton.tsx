import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

interface Props extends ButtonProps {
  children: string;
}

const NarrowButton: React.FC<Props> = (props) => {
  return (
    <Button w={24} bg="lightblue" textColor="#353935" {...props}>
      {props.children}
    </Button>
  );
};

export default NarrowButton;
