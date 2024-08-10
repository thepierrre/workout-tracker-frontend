import { Card, Flex, Heading, Select, Text } from "@chakra-ui/react";
import { format, getDate, getYear } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";

import SecondaryHeading from "../../components/UI/text/SecondaryHeading";
import { Workout } from "../../interfaces/workout.interface";

interface Props {
  workouts: Workout[];
  filteredWorkouts: Workout[];
  handleDaySelection: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleMonthSelection: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleYearSelection: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  years: number[];
  months: string[];
  days: number[];
}

const WorkoutHistory: React.FC<Props> = ({
  filteredWorkouts,
  handleDaySelection,
  handleMonthSelection,
  handleYearSelection,
  years,
  months,
  days,
}) => {
  return (
    <>
      <SecondaryHeading text="Workout history" />
      <Flex gap={2} w={["95vw", "85vw", "70vw", "50vw", "40vw"]} mb={3}>
        <Select
          placeholder="Day"
          onChange={(event) => handleDaySelection(event)}
          data-testid="day-select"
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
          data-testid="month-select"
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
          data-testid="year-select"
        >
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex direction="column" gap={2} overflowY="auto" maxH="25rem" mb={3}>
        {filteredWorkouts.map((workout) => (
          <Link
            to={`/workouts/${workout.id}`}
            key={workout.id}
            data-testid="workout-item"
          >
            <Card
              bg="#404040"
              color="white"
              padding={4}
              w={["95vw", "85vw", "70vw", "50vw", "40vw"]}
            >
              <Flex direction="column" gap={1}>
                <Text fontSize="sm">
                  {`${getDate(workout.creationDate)} ${format(
                    workout.creationDate,
                    "LLLL",
                  ).toUpperCase()}, ${getYear(workout.creationDate)}`}
                </Text>
                <Text fontWeight="bold">{workout.routineName}</Text>
              </Flex>
            </Card>
          </Link>
        ))}
      </Flex>
    </>
  );
};

export default WorkoutHistory;
