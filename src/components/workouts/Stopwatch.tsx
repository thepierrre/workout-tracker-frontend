import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState<number>(0);

  const [isRunning, setIsRunning] = useState<boolean>(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | number;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
    if (hours === 10) {
      setTime(0);
    }
  };
  return (
    <Flex direction="column" align="center" w="100%" p={2} gap={2}>
      <Flex fontSize="5xl" color="#404040" textAlign="center" fontWeight="bold">
        <Text w={8}>{hours}</Text>
        <Text>:</Text>
        <Text fontSize="5xl" color="#404040" w={16}>
          {minutes.toString().padStart(2, "0")}
        </Text>
        <Text>:</Text>
        <Text fontSize="5xl" color="#404040" w={16}>
          {seconds.toString().padStart(2, "0")}
        </Text>
        <Text>:</Text>
        <Text fontSize="5xl" color="#404040" w={16}>
          {milliseconds.toString().padStart(2, "0")}
        </Text>
      </Flex>

      <Flex gap={4}>
        <Button onClick={startAndStop} w={20} colorScheme="blue">
          {isRunning ? "Stop" : "Start"}
        </Button>
        <Button onClick={reset} w={20} colorScheme="gray">
          Reset
        </Button>
      </Flex>
    </Flex>
  );
};

export default Stopwatch;
