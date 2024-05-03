import { useState } from "react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { Flex, Button, Heading, Card, Text, Select } from "@chakra-ui/react";
import { format, getDate, getYear } from "date-fns";
import WorkoutSession from "../components/workouts/WorkoutSession";

const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.authenticatedUser.user);
  const workouts = useSelector(
    (state: RootState) => state.workoutSessions.workouts
  );

  const [currentDay, setCurrentDay] = useState<number | undefined>(undefined);
  const [currentMonth, setCurrentMonth] = useState<string | undefined>(
    undefined
  );
  const [currentYear, setCurrentYear] = useState<number | undefined>(undefined);

  const days: number[] = [];
  for (let i = 0; i < workouts.length; i++) {
    const day = getDate(workouts[i].creationDate);
    if (!days.includes(day)) {
      days.push(day);
    }
    days.sort((a, b) => a - b);
  }

  const months: string[] = [];
  for (let i = 0; i < workouts.length; i++) {
    const month = format(workouts[i].creationDate, "LLLL");
    if (!months.includes(month)) {
      months.push(month);
    }
    months.sort((a, b) => {
      const monthOrder = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return monthOrder.indexOf(a) - monthOrder.indexOf(b);
    });
  }

  const years: number[] = [];
  for (let i = 0; i < workouts.length; i++) {
    const year = getYear(workouts[i].creationDate);
    if (!years.includes(year)) {
      years.push(year);
    }
    years.sort((a, b) => b - a);
  }

  const handleLogout = () => {
    console.log("logging out...");
  };

  const handleDaySelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDay = +event.target.value;
    setCurrentDay(selectedDay);
    console.log(currentMonth);
  };

  const handleMonthSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedMonth = event.target.value;
    setCurrentMonth(selectedMonth);
    console.log(currentMonth);
  };

  const handleYearSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = +event.target.value;
    setCurrentYear(selectedYear);
    console.log(currentYear);
  };

  return (
    <Flex
      align="center"
      w="100vw"
      color="white"
      direction="column"
      gap={3}
      padding={2}
      marginTop={5}
    >
      <Heading fontSize="2xl">Hello, {user.username}</Heading>
      <Heading fontSize="lg">History</Heading>
      <Flex gap={2} w="95vw">
        <Select
          placeholder="Day"
          onChange={(event) => handleDaySelection(event)}
        >
          {days.map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Month"
          onChange={(event) => handleMonthSelection(event)}
        >
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Year"
          onChange={(event) => handleYearSelection(event)}
        >
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </Flex>
      {workouts.map((workout, index) => (
        <Card bg="#404040" color="white" padding={4} w="95vw" key={index}>
          <Flex direction="column" gap={2}>
            <Heading fontWeight="bold" fontSize="md">
              {`${getDate(workout.creationDate)} ${format(
                workout.creationDate,
                "LLLL"
              )}`}
            </Heading>
            <Text>{workout.routineName}</Text>
          </Flex>
        </Card>
      ))}
      <Button
        w="95vw"
        bg="lightblue"
        textColor="#353935"
        type="submit"
        mt={3}
        onClick={() => handleLogout()}
      >
        Log out
      </Button>
    </Flex>
  );
};

export default ProfilePage;

// add statistics (how many workouts, routines, exercises etc.)
// add history (e.g. display workouts for month and year)
