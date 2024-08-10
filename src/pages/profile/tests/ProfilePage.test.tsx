import { ChakraProvider } from "@chakra-ui/react";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
import routinesReducer from "../../../store/routines/routinesSlice";
import userSettingsReducer from "../../../store/settings/userSettingsSlice";
import activeExerciseInstanceReducer from "../../../store/workout/activeExerciseInstanceSlice";
import chosenDayReducer from "../../../store/workout/dayInCalendarSlice";
import workoutSessionsReducer from "../../../store/workout/workoutSessionsSlice";
import ProfilePage from "../ProfilePage";

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
    </ChakraProvider>,
  );
};

describe("ProfilePage", () => {
  test("renders the heading", async () => {
    renderWithProviders(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText("Hello, testUser")).toBeInTheDocument();
    });
  });

  test("filters workouts by day", async () => {
    renderWithProviders(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText("Hello, testUser")).toBeInTheDocument();
    });
    fireEvent.change(screen.getByTestId("day-select"), {
      target: { value: "15" },
    });
    const filteredWorkouts = screen.getAllByTestId("workout-item");
    expect(filteredWorkouts).toHaveLength(1);
  });

  test("filters workouts by month", async () => {
    renderWithProviders(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText("Hello, testUser")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByTestId("month-select"), {
      target: { value: "March" },
    });
    const filteredWorkouts = screen.getAllByTestId("workout-item");
    expect(filteredWorkouts).toHaveLength(1);
  });

  test("filters workouts by year", async () => {
    renderWithProviders(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText("Hello, testUser")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByTestId("year-select"), {
      target: { value: "2024" },
    });
    const filteredWorkouts = screen.getAllByTestId("workout-item");
    expect(filteredWorkouts).toHaveLength(1);
  });

  test("renders statistics", async () => {
    renderWithProviders(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText("Hello, testUser")).toBeInTheDocument();
    });

    const numberOfWorkouts = store.getState().workoutSessions.workouts.length;
    const numberOfRoutines = store.getState().routines.routines.length;
    const numberOfExercises = store.getState().exercises.exercises.length;
    expect(screen.getByText("Workouts:")).toBeInTheDocument();
    expect(screen.getByText(numberOfWorkouts)).toBeInTheDocument();
    expect(screen.getByText("Routines:")).toBeInTheDocument();
    expect(screen.getByText(numberOfRoutines)).toBeInTheDocument();
    expect(screen.getByText("Exercises:")).toBeInTheDocument();
    expect(screen.getByText(numberOfExercises)).toBeInTheDocument();
  });

  test("the logout button triggers logout", async () => {
    renderWithProviders(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText("Hello, testUser")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Log out"));
    waitFor(() => expect(screen.getByText("Hello there!")).toBeInTheDocument());
  });
});
