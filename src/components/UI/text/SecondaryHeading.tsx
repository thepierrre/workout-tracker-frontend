import { Heading } from "@chakra-ui/react";

interface Props {
  text: string;
}

const SecondaryHeading: React.FC<Props> = ({ text }) => {
  return (
    <Heading fontSize="lg" textAlign="center" m={[5, 0, 0, 0]}>
      {text}
    </Heading>
  );
};

export default SecondaryHeading;
