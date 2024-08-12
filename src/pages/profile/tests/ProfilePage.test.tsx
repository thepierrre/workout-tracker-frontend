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

  test("renders statistics", async () => {
    renderWithProviders(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText("Hello, testUser")).toBeInTheDocument();
    });

    expect(screen.getByText("Total workouts:")).toBeInTheDocument();
    expect(screen.getByText("Total reps:")).toBeInTheDocument();
    expect(screen.getByText("Maximum reps in a set:")).toBeInTheDocument();
    expect(screen.getByText("Total weight:")).toBeInTheDocument();
    expect(screen.getByText("Highest single weight:")).toBeInTheDocument();
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
