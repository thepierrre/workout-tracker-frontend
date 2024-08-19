import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../app/store";
import { setDay } from "../../store/workout/dayInCalendarSlice";
import "./styles/Calendar.css";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [displayedWeek, setDisplayedWeek] = useState<Date[]>(daysOfThisWeek);
  const [weekHeading, setWeekHeading] = useState<
    "THIS WEEK" | "LAST WEEK" | "NEXT WEEK"
  >("THIS WEEK");
  const chosenDay = useSelector((state: RootState) => state.chosenDay.day);
  const { workouts } = useSelector((state: RootState) => state.workoutSessions);
  const dispatch = useDispatch();

  useEffect(() => {
    updateWeekHeading();
  }, [displayedWeek]);

  const handleActiveDay = (index?: number, date?: Date) => {
    console.log("date", date);
    console.log("index", index);
    if (index !== undefined && index !== -1) {
      const selectedDate = displayedWeek[index];
      const formattedDate = format(selectedDate, "dd/MM/yyyy");
      console.log(formattedDate);
      dispatch(setDay(formattedDate));
    } else if (index === undefined && date) {
      // let date;
      // if (date === undefined) {
      //   date = new Date();
      // }
      const formattedDate = format(date, "dd/MM/yyyy");
      dispatch(setDay(formattedDate));
      onClose();
    }
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

  const updateWeekHeading = () => {
    if (displayedWeek === daysOfThisWeek) {
      setWeekHeading("THIS WEEK");
    } else if (displayedWeek === daysOfLastWeek) {
      setWeekHeading("LAST WEEK");
    } else if (displayedWeek === daysOfNextWeek) {
      setWeekHeading("NEXT WEEK");
    }
  };

  const handleDisplayedDayFormat = () => {
    const parsedDate = parse(chosenDay, "dd/MM/yyyy", new Date());
    return format(parsedDate, "dd MMM, yyyy");
  };

  return (
    <>
      <Flex direction="column" align="center">
        <Flex direction="column" align="center" mb={2}>
          <Text fontWeight="bold" fontSize="2xl">
            Your workouts
          </Text>
          <Text fontSize="xl" color="lightblue" fontWeight="bold" mb={4}>
            {handleDisplayedDayFormat().toLocaleUpperCase()}
          </Text>
        </Flex>
        <Heading fontSize="md" mb={2}>
          {weekHeading}
        </Heading>
        <Flex>
          <IconButton
            color="white"
            icon={<ChevronLeftIcon boxSize={8} />}
            isDisabled={displayedWeek === daysOfLastWeek ? true : false}
            aria-label="Go to previous week"
            variant="link"
            onClick={() => handleDisplayedWeek("previous")}
          />
          <Flex gap={2}>
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
          <IconButton
            aria-label="Calendar"
            variant="link"
            color="white"
            icon={<CalendarMonthIcon />}
            onClick={onOpen}
          />
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent top={24}>
          <ModalBody>
            <Calendar
              onClickDay={(value: Date) => handleActiveDay(undefined, value)}
              minDetail="year"
            />
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Datepicker;
