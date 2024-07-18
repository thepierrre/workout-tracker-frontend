import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

interface Props extends ButtonProps {
  children: string;
}

const SmallButton: React.FC<Props> = (props) => {
  return (
    <Button
      bg="#404040"
      w={10}
      h={10}
      borderRadius={8}
      fontSize="3xl"
      textColor="white"
      _active={{ textColor: "#404040" }}
      _focus={{ bg: "#404040" }}
      css={{
        ":focus-visible": {
          outline: "none",
        },
        ":active": {
          background: "lightblue",
        },
        ":focus": {
          outline: "none",
        },
        WebkitTapHighlightColor: "transparent",
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default SmallButton;
