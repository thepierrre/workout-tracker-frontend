import { Card, Flex, Spinner, Text } from "@chakra-ui/react";

interface Props {
  text: string;
  value: string | number | undefined;
}

const StatisticsUnit: React.FC<Props> = ({ text, value }) => {
  return (
    <Card
      bg="#404040"
      color="white"
      padding={4}
      w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
      gap={2}
    >
      <Flex gap={2}>
        <Text fontWeight="bold" w="60%" color="lightblue">
          {text}
        </Text>
        {value ? (
          <Text fontWeight="bold" w="40%">
            {value}
          </Text>
        ) : (
          <Flex w="40%">
            <Spinner size="xs" color="lightblue" />
          </Flex>
        )}
      </Flex>
    </Card>
  );
};

export default StatisticsUnit;
