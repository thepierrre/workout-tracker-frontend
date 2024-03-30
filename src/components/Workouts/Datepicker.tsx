import { useState } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";

const Datepicker = () => {
  const [activeDay, setActiveDay] = useState<number | undefined>(undefined);

  let dates: { day: String; date: number }[] = [
    { day: "MON", date: 25 },
    { day: "TUE", date: 26 },
    { day: "WED", date: 27 },
    { day: "THU", date: 28 },
    { day: "FRI", date: 29 },
    { day: "SAT", date: 30 },
    { day: "SUN", date: 31 },
  ];

  const handleActiveDay = (index: number) => {
    setActiveDay(index);
  };

  const datesComponents = dates.map((dateObj, index) => (
    <Flex
      key={index}
      direction="column"
      align="center"
      gap={1}
      onClick={() => handleActiveDay(index)}
    >
      <Text fontSize="xs" fontWeight={activeDay === index ? "bold" : ""}>
        {dateObj.day}
      </Text>
      <Box
        paddingInline={1}
        borderRadius={7}
        bg={activeDay === index ? "lightblue" : ""}
      >
        <Text fontSize="xl" color={activeDay === index ? "#353935" : ""}>
          {dateObj.date}
        </Text>
      </Box>
    </Flex>
  ));

  return <Flex gap={6}>{datesComponents}</Flex>;
};

export default Datepicker;
