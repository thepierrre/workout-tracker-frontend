import { ChakraProvider } from "@chakra-ui/react";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { initializedUser } from "../../../mockData/authHandlers/userHandler";
import { exerciseTypesForUser } from "../../../mockData/handlers/exerciseTypesForUserHandler";
import { routinesForUser } from "../../../mockData/handlers/routinesForUserHandler";
import { userSettings } from "../../../mockData/handlers/userSettingsHandler";
import { workoutsForUser } from "../../../mockData/handlers/workoutsForUserHandler";
import authenticatedUserReducer from "../../../store/auth/authenticatedUserSlice";
import categoriesReducer from "../../../store/exercises/categoriesSlice";
import exercisesReducer from "../../../store/exercises/exercisesSlice";
import localRoutineReducer from "../../../store/routines/localRoutineSlice";
import routinesReducer from "../../../store/routines/routinesSlice";
import userSettingsReducer from "../../../store/settings/userSettingsSlice";
import activeExerciseInstanceReducer from "../../../store/workout/activeExerciseInstanceSlice";
import chosenDayReducer from "../../../store/workout/dayInCalendarSlice";
import workoutSessionsReducer from "../../../store/workout/workoutSessionsSlice";
import NewWorkout from "../NewWorkout";

const store = configureStore({
  reducer: {
    workoutSessions: workoutSessionsReducer,
    chosenDay: chosenDayReducer,
    activeExerciseInstance: activeExerciseInstanceReducer,
    authenticatedUser: authenticatedUserReducer,
    exercises: exercisesReducer,
    routines: routinesReducer,
    categories: categoriesReducer,
    userSettings: userSettingsReducer,
    localRoutine: localRoutineReducer,
  },
  preloadedState: {
    authenticatedUser: {
      user: initializedUser,
      loading: false,
      error: null,
    },
    workoutSessions: {
      workouts: workoutsForUser,
      loading: false,
      error: null,
    },
    routines: {
      routines: routinesForUser,
      loading: false,
      error: null,
    },
    exercises: {
      exercises: exerciseTypesForUser,
      loading: false,
      error: null,
    },
    userSettings: {
      userSettings: userSettings,
      loading: false,
      error: null,
    },
    localRoutine: {
      name: "",
      routineExercises: [],
      loading: false,
      error: null,
    },
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider>
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
    </ChakraProvider>,
  );
};

describe("SingleRoutine", () => {
  test("renders the drawer for choosing a new workout", async () => {
    renderWithProviders(<NewWorkout />);

    fireEvent.click(screen.getByText("New workout"));
    expect(screen.getByText("Select a routine")).toBeInTheDocument();
    expect(screen.getByText("Full Body Workout A")).toBeInTheDocument();
    expect(screen.getByText("Full Body Workout B")).toBeInTheDocument();
    expect(screen.getAllByText("4 EXERCISES")).toHaveLength(2);
    expect(
      screen.getByText("bench press | barbell rows | squats | dumbbell pushes"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "incline bench press | pull-downs | deadlifts | dumbbell lateral raises",
      ),
    ).toBeInTheDocument();
  });
});
