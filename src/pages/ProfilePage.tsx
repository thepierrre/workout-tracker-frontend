import { useState } from "react";
import { Link } from "react-router-dom";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { Workout } from "../interfaces/workout.interface";
import { Flex, Button, Heading, Card, Text, Select } from "@chakra-ui/react";
import { format, getDate, getYear } from "date-fns";

const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.authenticatedUser.user);
  const workouts = useSelector(
    (state: RootState) => state.workoutSessions.workouts
  );
  const routines = useSelector((state: RootState) => state.routines.routines);
  const exercises = useSelector(
    (state: RootState) => state.exercises.exercises
  );

  const [chosenDay, setChosenDay] = useState<number | undefined>(undefined);
  const [chosenMonth, setChosenMonth] = useState<string | undefined>(undefined);
  const [chosenYear, setChosenYear] = useState<number | undefined>(undefined);

  const [_filteredByDay, setFilteredByDay] = useState<Workout[]>([]);
  const [_filteredByMonth, setFilteredByMonth] = useState<Workout[]>([]);
  const [_filteredByYear, setFilteredByYear] = useState<Workout[]>([]);
  const [_allFilteredWorkouts, setAllFilteredWorkouts] = useState<Workout[]>(
    []
  );

  const filteredWorkouts = workouts.filter((workout) => {
    const workoutDay = getDate(workout.creationDate);
    const workoutMonth = format(workout.creationDate, "LLLL");
    const workoutYear = getYear(workout.creationDate);

    return (
      (!chosenDay || workoutDay === chosenDay) &&
      (!chosenMonth || workoutMonth === chosenMonth) &&
      (!chosenYear || workoutYear === chosenYear)
    );
  });

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

  const handleFilteredWorkouts = () => {
    const filteredByDay = workouts.filter(
      (workout) => getDate(workout.creationDate) === chosenDay
    );

    const filteredByMonth = workouts.filter(
      (workout) => format(workout.creationDate, "LLLL") === chosenMonth
    );

    const filteredByYear = workouts.filter(
      (workout) => getYear(workout.creationDate) === chosenYear
    );

    // Calculate intersection of all filters
    const filteredResults = filteredByDay
      .filter((workout) => filteredByMonth.includes(workout))
      .filter((workout) => filteredByYear.includes(workout));

    setAllFilteredWorkouts(filteredResults);
  };

  const handleDaySelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDay = +event.target.value;
    if (selectedDay === 0) {
      setChosenDay(undefined);
    } else {
      setChosenDay(selectedDay);
      setFilteredByDay(
        workouts.filter(
          (workout) => getDate(workout.creationDate) === selectedDay
        )
      );
    }
    handleFilteredWorkouts();
  };

  const handleMonthSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedMonth = event.target.value;
    if (!selectedMonth) {
      setChosenMonth(undefined);
    } else {
      setChosenMonth(selectedMonth);
      setFilteredByMonth(
        workouts.filter(
          (workout) => format(workout.creationDate, "LLLL") === selectedMonth
        )
      );
    }
    handleFilteredWorkouts();
  };

  const handleYearSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = +event.target.value;
    if (selectedYear === 0) {
      setChosenYear(undefined);
    } else {
      setChosenYear(selectedYear);
      setFilteredByYear(
        workouts.filter(
          (workout) => getYear(workout.creationDate) === selectedYear
        )
      );
    }
    handleFilteredWorkouts();
  };

  return (
    <Flex
      align="center"
      w="100vw"
      color="white"
      direction="column"
      gap={5}
      padding={2}
      marginTop={5}
    >
      <Heading fontSize="2xl">Hello, {user.username}</Heading>
      <Heading fontSize="lg">Workout history</Heading>
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
      <Flex direction="column" gap={2} overflowY="auto" maxH="25rem">
        {filteredWorkouts.map((workout) => (
          <Link to={`/workouts/${workout.id}`} key={workout.id}>
            <Card bg="#404040" color="white" padding={4} w="95vw">
              <Flex direction="column" gap={1}>
                <Text fontSize="sm">
                  {`${getDate(workout.creationDate)} ${format(
                    workout.creationDate,
                    "LLLL"
                  ).toUpperCase()}, ${getYear(workout.creationDate)}`}
                </Text>
                <Text fontWeight="bold">{workout.routineName}</Text>
              </Flex>
            </Card>
          </Link>
        ))}
      </Flex>

      <Flex direction="column" align="center" gap={2}>
        <Heading fontSize="lg" mb={1}>
          Statistics
        </Heading>
        <Card bg="#404040" color="white" padding={4} w="95vw" gap={2}>
          <Flex gap={2}>
            <Text fontWeight="bold">Workouts:</Text>
            <Text>{workouts.length}</Text>
          </Flex>
        </Card>
        <Card bg="#404040" color="white" padding={4} w="95vw" gap={2}>
          <Flex gap={2}>
            <Text fontWeight="bold">Routines:</Text>
            <Text>{routines.length}</Text>
          </Flex>
        </Card>
        <Card bg="#404040" color="white" padding={4} w="95vw" gap={2}>
          <Flex gap={2}>
            <Text fontWeight="bold">Exercises:</Text>
            <Text>{exercises.length}</Text>
          </Flex>
        </Card>
      </Flex>
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
