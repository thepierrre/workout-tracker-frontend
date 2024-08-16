import { Card, Flex, Text } from "@chakra-ui/react";

interface Props {
  text: string;
  value: string | number;
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
        <Text fontWeight="bold">{value}</Text>
      </Flex>
    </Card>
  );
};

export default StatisticsUnit;
