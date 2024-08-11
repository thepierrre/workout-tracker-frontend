import { Heading } from "@chakra-ui/react";

interface Props {
  text: string;
}

const MainHeading: React.FC<Props> = ({ text }) => {
  return (
    <Heading
      w="100%"
      fontSize="2xl"
      textAlign="center"
      color="white"
      mt={5}
      mb={5}
    >
      {text}
    </Heading>
  );
};

export default MainHeading;
