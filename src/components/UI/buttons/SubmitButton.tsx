import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  text: "SAVE" | "CREATE";
  onClick: () => void;
}

const SubmitButton: React.FC<Props> = ({ text, onClick }) => {
  return (
    <Box position="absolute" top="4.7rem" right="3rem" onClick={onClick}>
      <Text fontWeight="bold" color="#48BB78">
        {text}
      </Text>
    </Box>
  );
};

export default SubmitButton;
