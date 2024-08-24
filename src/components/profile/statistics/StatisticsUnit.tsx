import { Card, Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface Props {
  text: string;
  value: string | number | undefined;
}

const StatisticsUnit: React.FC<Props> = ({ text, value }) => {
  const [currentValue, setCurrentValue] = useState<string | number | undefined>(
    value,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (value === undefined) {
      setIsLoading(true);
    } else {
      setCurrentValue(value);
      setIsLoading(false);
    }
  }, [value]);

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
        {isLoading ? (
          <Flex w="40%">
            <Spinner size="xs" color="lightblue" />
          </Flex>
        ) : (
          <Text fontWeight="bold" w="40%">
            {currentValue}
          </Text>
        )}
      </Flex>
    </Card>
  );
};

export default StatisticsUnit;
