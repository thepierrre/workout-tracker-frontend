import { useState } from "react";
import { Link } from "react-router-dom";
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

  const [chosenDay, setChosenDay] = useState<number | undefined>(undefined);
  const [chosenMonth, setChosenMonth] = useState<string | undefined>(undefined);
  const [chosenYear, setChosenYear] = useState<number | undefined>(undefined);

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
    if (selectedDay === 0) {
      setChosenDay(undefined);
    } else {
      setChosenDay(selectedDay);
    }
  };

  const handleMonthSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedMonth = event.target.value;
    if (!selectedMonth) {
      setChosenMonth(undefined);
    } else {
      setChosenMonth(selectedMonth);
    }
  };

  const handleYearSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = +event.target.value;
    if (selectedYear === 0) {
      setChosenYear(undefined);
    } else {
      setChosenYear(selectedYear);
    }
    console.log(chosenYear);
  };

  const filteredWorkouts1 = workouts.filter(
    (workout) => getYear(workout.creationDate) === chosenYear
  );

  let filteredWorkouts;

  const filteredByDay = workouts.filter(
    (workout) => getDate(workout.creationDate) === chosenYear
  );

  const filteredByMonth = workouts.filter(
    (workout) => format(workout.creationDate, "LLLL") === chosenMonth
  );

  const filteredByYear = workouts.filter(
    (workout) => getYear(workout.creationDate) === chosenYear
  );

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
      {filteredWorkouts1.map((workout) => (
        <Link to={`/workouts/${workout.id}`} key={workout.id}>
          <Card bg="#404040" color="white" padding={4} w="95vw">
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
        </Link>
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
