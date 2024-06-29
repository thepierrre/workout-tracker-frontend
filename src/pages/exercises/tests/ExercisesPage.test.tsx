import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ExercisesPage from "./ExercisesPage";
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

describe("ExercisesPage", () => {
  test("renders the 'New exercise' button correctly", () => {
    renderWithProviders(<ExercisesPage />);
    expect(screen.getByText("New exercise")).toBeInTheDocument();
  });

  test("renders the correct number of exercises and their categories", () => {
    renderWithProviders(<ExercisesPage />);
    const exerciseElements = screen.getAllByTestId(/^exercise-name-/);
    expect(exerciseElements).toHaveLength(mockExerciseTypes.length);

    mockExerciseTypes.forEach((exercise) => {
      const exerciseElement = screen.getByTestId(
        `exercise-name-${exercise.id}`
      );
      expect(exerciseElement).toBeInTheDocument();
      expect(exerciseElement).toHaveTextContent(exercise.name);

      const categoriesElement = screen.getByTestId(
        `exercise-categories-${exercise.id}`
      );
      const expectedCategories = exercise.categories
        .map((category) => category?.name)
        .join(" | ")
        .toUpperCase()
        .trim();
      expect(categoriesElement).toBeInTheDocument();
      expect(categoriesElement).toHaveTextContent(expectedCategories);
    });
  });

  test("renders the 'New exercise' page when the 'New exercise' button is clicked", () => {
    renderWithProviders(<ExercisesPage />);
    fireEvent.click(screen.getByText("New exercise"));
    waitFor(() =>
      expect(screen.getByText("Add a new exercise")).toBeInTheDocument()
    );
  });
});
