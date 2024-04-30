import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Flex, Text, Box } from "@chakra-ui/react";
import { setDay } from "../../features/workout/dayInCalendarSlice";
import { format } from "date-fns";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const today = new Date();

const currentDayOfWeek = today.getDay();
const mondayOffset = (currentDayOfWeek + 6) % 7;
const daysOfThisWeek = Array.from({ length: 7 }, (_, index) => {
  const date = new Date(today);
  date.setDate(today.getDate() - mondayOffset + index);
  return date;
});

const todayMinus7 = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
const todayPlus7 = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

const daysOfLastWeek = Array.from({ length: 7 }, (_, index) => {
  const date = new Date(todayMinus7);
  date.setDate(todayMinus7.getDate() - mondayOffset + index);
  return date;
});

const daysOfNextWeek = Array.from({ length: 7 }, (_, index) => {
  const date = new Date(todayPlus7);
  date.setDate(todayPlus7.getDate() - mondayOffset + index);
  return date;
});

const Datepicker = () => {
  const [displayedWeek, setDisplayedWeek] = useState<Date[]>(daysOfThisWeek);
  const chosenDay = useSelector((state: RootState) => state.chosenDay.day);
  const dispatch = useDispatch();

  const handleActiveDay = (index: number) => {
    const selectedDate = daysOfThisWeek[index];
    const formattedDate = format(selectedDate, "dd/MM/yyyy");
    dispatch(setDay(formattedDate));
  };

  const handleDisplayedWeek = (week: string) => {
    if (week === "following") {
      if (displayedWeek === daysOfThisWeek) {
        setDisplayedWeek(daysOfNextWeek);
      } else if (displayedWeek === daysOfLastWeek) {
        setDisplayedWeek(daysOfThisWeek);
      }
    } else if (week === "previous") {
      if (displayedWeek === daysOfThisWeek) {
        setDisplayedWeek(daysOfLastWeek);
      } else if (displayedWeek === daysOfNextWeek) {
        setDisplayedWeek(daysOfThisWeek);
      }
    }
  };

  return (
    <Flex align="center">
      {displayedWeek !== daysOfLastWeek && (
        <ChevronLeftIcon
          boxSize={8}
          onClick={() => handleDisplayedWeek("previous")}
        />
      )}
      <Flex gap={4}>
        {displayedWeek.map((day, index) => (
          <Flex
            key={index}
            direction="column"
            align="center"
            gap={1}
            onClick={() => handleActiveDay(index)}
          >
            <Text
              fontSize="xs"
              fontWeight={chosenDay === format(day, "dd/MM/yyyy") ? "bold" : ""}
            >
              {format(new Date(day), "EEE").toUpperCase()}
            </Text>
            <Box
              paddingInline={1}
              borderRadius={7}
              bg={chosenDay === format(day, "dd/MM/yyyy") ? "lightblue" : ""}
            >
              <Text
                fontSize="xl"
                color={chosenDay === format(day, "dd/MM/yyyy") ? "#353935" : ""}
              >
                {day.getDate()}
              </Text>
            </Box>
          </Flex>
        ))}
      </Flex>
      {displayedWeek !== daysOfNextWeek && (
        <ChevronRightIcon
          boxSize={8}
          onClick={() => handleDisplayedWeek("following")}
        />
      )}
    </Flex>
  );
};

export default Datepicker;
