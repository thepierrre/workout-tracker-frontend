import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../util/axiosInstance";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../features/auth/authenticatedUserSlice";
import { Workout } from "../../interfaces/workout.interface";
import { Button, Heading } from "@chakra-ui/react";
import { format, getDate, getYear } from "date-fns";
import Container from "../../components/UI/Container";
import Statistics from "../../components/profile/Statistics";
import WorkoutHistory from "../../components/profile/WorkoutHistory";
import LogIn from "../../components/profile/LogIn";
import WideButton from "../../components/UI/WideButton";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    try {
      await axiosInstance.post("auth/logout");

      dispatch(clearUser());

      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
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
    <Container>
      {user !== undefined ? (
        <>
          <Heading fontSize="2xl" mb={5}>
            Hello, {user?.username || "noname"}
          </Heading>
          <WorkoutHistory
            workouts={workouts}
            filteredWorkouts={filteredWorkouts}
            handleDaySelection={handleDaySelection}
            handleMonthSelection={handleMonthSelection}
            handleYearSelection={handleYearSelection}
            years={years}
            months={months}
            days={days}
          />
          <Statistics
            routines={routines}
            exercises={exercises}
            workouts={workouts}
          />
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
        </>
      ) : (
        <>
          <Heading fontSize="lg" mb={3}>
            Sign in to your account
          </Heading>
          <LogIn />
          <Link to="/profile/sign-up">
            <WideButton>Register</WideButton>
          </Link>
        </>
      )}
    </Container>
  );
};

export default ProfilePage;
