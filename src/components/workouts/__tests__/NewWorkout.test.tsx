import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import NewWorkout from "../NewWorkout";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import workoutSessionsReducer from "../../../features/workout/workoutSessionsSlice";
import chosenDayReducer from "../../../features/workout/dayInCalendarSlice";
import activeExerciseInstanceReducer from "../../../features/workout/activeExerciseInstanceSlice";
import authenticatedUserReducer from "../../../features/auth/authenticatedUserSlice";
import exercisesReducer from "../../../features/exercises/exercisesSlice";
import routinesReducer from "../../../features/routines/routinesSlice";
import categoriesReducer from "../../../features/exercises/categoriesSlice";
import userSettingsReducer from "../../../features/settings/userSettingsSlice";
import { initializedUser } from "../../../mockData/authHandlers/userHandler";
import { workoutsForUser } from "../../../mockData/handlers/workoutsForUserHandler";
import { routinesForUser } from "../../../mockData/handlers/routinesForUserHandler";
import { exerciseTypesForUser } from "../../../mockData/handlers/exerciseTypesForUserHandler";
import { userSettings } from "../../../mockData/handlers/userSettingsHandler";

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
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider>
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
    </ChakraProvider>
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
      screen.getByText("bench press | barbell rows | squats | dumbbell pushes")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "incline bench press | pull-downs | deadlifts | dumbbell lateral raises"
      )
    ).toBeInTheDocument();
  });
});
