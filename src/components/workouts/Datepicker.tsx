import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../app/store";
import { setDay } from "../../store/workout/dayInCalendarSlice";
import "./Calendar.css";

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
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [displayedWeek, setDisplayedWeek] = useState<Date[]>(daysOfThisWeek);
  const chosenDay = useSelector((state: RootState) => state.chosenDay.day);
  const { workouts } = useSelector((state: RootState) => state.workoutSessions);
  const dispatch = useDispatch();

  const handleActiveDay = (index: number) => {
    const selectedDate = displayedWeek[index];
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

  const doesDayHaveWorkouts = (day: Date): boolean => {
    const formattedDay = format(day, "yyyy-MM-dd");
    const workoutsForDay = workouts.some(
      (wrk) => wrk.creationDate === formattedDay,
    );
    return workoutsForDay ? true : false;
  };

  return (
    <>
      <Flex align="center" m={2}>
        <IconButton
          color="white"
          icon={<ChevronLeftIcon boxSize={8} />}
          isDisabled={displayedWeek === daysOfLastWeek ? true : false}
          aria-label="Go to previous week"
          variant="link"
          onClick={() => handleDisplayedWeek("previous")}
        />
        <Flex gap={4}>
          {displayedWeek.map((day, index) => (
            <Flex
              key={index}
              direction="column"
              align="center"
              gap={1}
              onClick={() => handleActiveDay(index)}
              w={7}
            >
              <Text
                fontSize="xs"
                fontWeight={
                  chosenDay === format(day, "dd/MM/yyyy") ? "bold" : ""
                }
              >
                {format(new Date(day), "EEE").toUpperCase()}
              </Text>
              <Flex direction="column" w={8} h={12} align="center" gap={1}>
                <Box
                  w="100%"
                  borderRadius={7}
                  bg={
                    chosenDay === format(day, "dd/MM/yyyy") ? "lightblue" : ""
                  }
                >
                  <Text
                    fontSize="xl"
                    color={
                      chosenDay === format(day, "dd/MM/yyyy") ? "#353935" : ""
                    }
                    textAlign="center"
                  >
                    {day.getDate()}
                  </Text>
                </Box>

                {doesDayHaveWorkouts(day) && (
                  <Box bg="lightblue" w={2} h={2} borderRadius={4}></Box>
                )}
              </Flex>
            </Flex>
          ))}
        </Flex>
        <IconButton
          color="white"
          icon={<ChevronRightIcon boxSize={8} />}
          isDisabled={displayedWeek === daysOfNextWeek ? true : false}
          aria-label="Go to previous week"
          variant="link"
          onClick={() => handleDisplayedWeek("following")}
        />
        {/* <IconButton
          aria-label="Calendar"
          variant="link"
          color="white"
          icon={<CalendarMonthIcon />}
          onClick={onOpen}
        /> */}
      </Flex>
      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent top={24}>
          <ModalBody>
            <Calendar
              onClickDay={(value) => console.log(value)}
              minDetail="year"
            />
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal> */}
    </>
  );
};

export default Datepicker;
