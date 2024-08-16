import { Heading } from "@chakra-ui/react";

interface Props {
  text: string;
}

const SecondaryHeading: React.FC<Props> = ({ text }) => {
  return (
    <Heading fontSize="lg" textAlign="center" mt={5} mb={3}>
      {text}
    </Heading>
  );
};

export default SecondaryHeading;
