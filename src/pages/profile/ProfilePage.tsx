import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../../util/axiosInstance.ts";
import { RootState, AppDispatch } from "../../app/store";
import { fetchWorkouts } from "../../features/workout/workoutSessionsSlice";
import { fetchExercises } from "../../features/exercises/exercisesSlice";
import { fetchRoutines } from "../../features/routines/routinesSlice";
import { fetchUserSettings } from "../../features/settings/userSettingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../features/auth/authenticatedUserSlice";
import { Workout } from "../../interfaces/workout.interface";
import { Button, Heading } from "@chakra-ui/react";
import { format, getDate, getYear } from "date-fns";
import Container from "../../components/UI/Container";
import Statistics from "../../components/profile/Statistics";
import WorkoutHistory from "../../components/profile/WorkoutHistory";
import SpinnerComponent from "../../components/UI/SpinnerComponent";
import Weight from "../../components/profile/Weight";

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.authenticatedUser.user);
  const { workouts, loading: loadingWorkouts } = useSelector(
    (state: RootState) => state.workoutSessions
  );
  const { routines, loading: loadingRoutines } = useSelector(
    (state: RootState) => state.routines
  );
  const { exercises, loading: loadingExercises } = useSelector(
    (state: RootState) => state.exercises
  );
  const { userSettings, loading: loadingUserSettings } = useSelector(
    (state: RootState) => state.userSettings
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

  useEffect(() => {
    dispatch(fetchWorkouts());
    dispatch(fetchRoutines());
    dispatch(fetchExercises());
    dispatch(fetchUserSettings());
  }, [dispatch]);

  const filteredWorkouts = workouts.filter((workout: Workout) => {
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
      (workout: Workout) => getDate(workout.creationDate) === chosenDay
    );

    const filteredByMonth = workouts.filter(
      (workout: Workout) => format(workout.creationDate, "LLLL") === chosenMonth
    );

    const filteredByYear = workouts.filter(
      (workout: Workout) => getYear(workout.creationDate) === chosenYear
    );

    // Calculate intersection of all filters
    const filteredResults = filteredByDay
      .filter((workout: Workout) => filteredByMonth.includes(workout))
      .filter((workout: Workout) => filteredByYear.includes(workout));

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
          (workout: Workout) => getDate(workout.creationDate) === selectedDay
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
          (workout: Workout) =>
            format(workout.creationDate, "LLLL") === selectedMonth
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
          (workout: Workout) => getYear(workout.creationDate) === selectedYear
        )
      );
    }
    handleFilteredWorkouts();
  };

  if (
    loadingWorkouts ||
    loadingRoutines ||
    loadingExercises ||
    loadingUserSettings
  ) {
    return <SpinnerComponent />;
  }

  return (
    <Container>
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
        {userSettings && <Weight userSettings={userSettings} />}
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
    </Container>
  );
};

export default ProfilePage;
