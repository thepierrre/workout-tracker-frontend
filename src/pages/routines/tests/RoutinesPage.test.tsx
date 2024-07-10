import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RoutinesPage from "./RoutinesPage";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import workoutSessionsReducer from "../../features/workout/workoutSessionsSlice";
import chosenDayReducer from "../../features/workout/dayInCalendarSlice";
import activeExerciseInstanceReducer from "../../features/workout/activeExerciseInstanceSlice";
import authenticatedUserReducer from "../../features/auth/authenticatedUserSlice";
import exercisesReducer from "../../features/exercises/exercisesSlice";
import routinesReducer from "../../features/routines/routinesSlice";
import categoriesReducer from "../../features/exercises/categoriesSlice";
import {
  mockUser,
  mockExerciseTypes,
  mockWorkouts,
  mockCategories,
  mockRoutines,
} from "../../util/testData";

const store = configureStore({
  reducer: {
    workoutSessions: workoutSessionsReducer,
    chosenDay: chosenDayReducer,
    activeExerciseInstance: activeExerciseInstanceReducer,
    authenticatedUser: authenticatedUserReducer,
    exercises: exercisesReducer,
    routines: routinesReducer,
    categories: categoriesReducer,
  },
  preloadedState: {
    authenticatedUser: {
      user: mockUser,
      loading: false,
      error: null,
    },
    workoutSessions: {
      workouts: mockWorkouts,
      loading: false,
      error: null,
    },
    routines: {
      routines: mockRoutines,
      loading: false,
      error: null,
    },
    exercises: {
      exercises: mockExerciseTypes,
      loading: false,
      error: null,
    },
    categories: {
      categories: mockCategories,
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

describe("RoutinesPage", () => {
  test("renders the 'New routine' button correctly", () => {
    renderWithProviders(<RoutinesPage />);
    expect(screen.getByText("New routine")).toBeInTheDocument();
  });

  test("renders the correct number of routines and their exercises", () => {
    renderWithProviders(<RoutinesPage />);
    const routineElements = screen.getAllByTestId(/^routine-name-/);
    expect(routineElements).toHaveLength(mockRoutines.length);

    mockRoutines.forEach((routine) => {
      const routineElement = screen.getByTestId(`routine-name-${routine.id}`);
      expect(routineElement).toBeInTheDocument();
      expect(routineElement).toHaveTextContent(routine.name);

      const exercisesElement = screen.getByTestId(
        `routine-exercises-${routine.id}`
      );
      const expectedExercises = routine.exerciseTypes
        .map((exercise) => exercise?.name.trim())
        .join(" | ");
      expect(exercisesElement).toBeInTheDocument();
      expect(exercisesElement).toHaveTextContent(expectedExercises);
    });
  });

  test("renders the 'New routine' page when the 'New routine' button is clicked", () => {
    renderWithProviders(<RoutinesPage />);
    fireEvent.click(screen.getByText("New routine"));
    waitFor(() =>
      expect(screen.getByText("Add a new routine")).toBeInTheDocument()
    );
  });
});
