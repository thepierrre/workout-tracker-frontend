import { Flex, Text } from "@chakra-ui/react";

const Datepicker = () => {
  let dates: { day: String; date: number }[] = [
    { day: "MON", date: 25 },
    { day: "TUE", date: 26 },
    { day: "WED", date: 27 },
    { day: "THU", date: 28 },
    { day: "FRI", date: 29 },
    { day: "SAT", date: 30 },
    { day: "SUN", date: 31 },
  ];

  const datesComponents = dates.map((dateObj, index) => (
    <Flex key={index} direction="column" align="center">
      <Text fontSize="xs">{dateObj.day}</Text>
      <Text fontSize="xl">{dateObj.date}</Text>
    </Flex>
  ));

  return <Flex gap={7}>{datesComponents}</Flex>;
};

export default Datepicker;
