import { Alert, AlertIcon, Flex, Text } from "@chakra-ui/react";

interface Props {
  message1: string;
  message2: string;
  message3: string;
}

const CustomAlert: React.FC<Props> = ({ message1, message2, message3 }) => {
  return (
    <Alert status="error" variant="top-accent" gap={8} pt={4}>
      <AlertIcon boxSize="30px" position="absolute" />
      <Flex direction="column" align="center" w="100%">
        <Text mb={4} textAlign="center">
          {message1}
          <br />
          {message2}
        </Text>
        <Text fontWeight="bold">{message3}</Text>
      </Flex>
    </Alert>
  );
};

export default CustomAlert;
