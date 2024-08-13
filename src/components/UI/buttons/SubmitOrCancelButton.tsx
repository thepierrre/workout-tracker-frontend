import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  text: "SAVE" | "CREATE" | "CANCEL";
  top: string;
  right?: string[];
  left?: string[];
  link?: string;
  onClick?: () => void;
}

const SubmitOrCancelButton: React.FC<Props> = ({
  text,
  top,
  right,
  left,
  link,
  onClick,
}) => {
  const defineColor =
    text === "SAVE" || text === "CREATE" ? "#48BB78" : "#FC8181";

  const Button = (
    <Box
      position="absolute"
      top={top}
      right={right}
      left={left}
      onClick={onClick}
    >
      <Text fontWeight="bold" color={defineColor}>
        {text}
      </Text>
    </Box>
  );

  return link ? <Link to={link}>{Button}</Link> : Button;
};

export default SubmitOrCancelButton;
