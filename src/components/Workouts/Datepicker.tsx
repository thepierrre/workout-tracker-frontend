import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { Flex, Text, Box } from "@chakra-ui/react";
import { setDay } from "../../features/workout/dayInCalendarSlice";
import { format } from "date-fns";

const Datepicker = () => {
  const chosenDay = useSelector((state: RootState) => state.chosenDay.day);
  const dispatch = useDispatch();

  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const mondayOffset = (currentDayOfWeek + 6) % 7;
  const displayedDaysOfWeek = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - mondayOffset + index);
    return date;
  });

  const handleActiveDay = (index: number) => {
    const selectedDate = displayedDaysOfWeek[index];
    const formattedDate = selectedDate.toString();
    dispatch(setDay(formattedDate));
    console.log(displayedDaysOfWeek[index]);
  };

  return (
    <Flex gap={6}>
      {displayedDaysOfWeek.map((day, index) => (
        <Flex
          key={index}
          direction="column"
          align="center"
          gap={1}
          onClick={() => handleActiveDay(index)}
        >
          <Text
            fontSize="xs"
            fontWeight={chosenDay === day.toString() ? "bold" : ""}
          >
            {day
              .toLocaleDateString("en-us", {
                weekday: "short",
              })
              .toUpperCase()}
          </Text>
          <Box
            paddingInline={1}
            borderRadius={7}
            bg={
              format(chosenDay, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
                ? "lightblue"
                : ""
            }
          >
            <Text
              fontSize="xl"
              color={
                format(chosenDay, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
                  ? "#353935"
                  : ""
              }
            >
              {day.getDate()}
            </Text>
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};

export default Datepicker;
