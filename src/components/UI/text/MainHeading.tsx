import { Heading } from "@chakra-ui/react";

interface Props {
  text: string;
  mb?: number;
}

const MainHeading: React.FC<Props> = ({ text, mb = 4 }) => {
  return (
    <Heading
      w="100%"
      fontSize="2xl"
      textAlign="center"
      color="white"
      mb={mb}
      mt="0.7rem"
    >
      {text}
    </Heading>
  );
};

export default MainHeading;
