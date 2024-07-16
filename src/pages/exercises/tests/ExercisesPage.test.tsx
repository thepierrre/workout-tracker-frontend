import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ExercisesPage from "../ExercisesPage";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import workoutSessionsReducer from "../../../features/workout/workoutSessionsSlice";
import chosenDayReducer from "../../../features/workout/dayInCalendarSlice";
import activeExerciseInstanceReducer from "../../../features/workout/activeExerciseInstanceSlice";
import authenticatedUserReducer from "../../../features/auth/authenticatedUserSlice";
import exercisesReducer from "../../../features/exercises/exercisesSlice";
import routinesReducer from "../../../features/routines/routinesSlice";
import categoriesReducer from "../../../features/exercises/categoriesSlice";
import { workoutsForUser } from "../../../mockData/getHandlers/getWorkoutsForUserHandler";
import { categories } from "../../../mockData/getHandlers/getCategoriesHandler";
import { initializedUser } from "../../../mockData/authHandlers/initializeUserHandler";
import { exerciseTypesForUser } from "../../../mockData/getHandlers/getExerciseTypesForUserHandler";

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
      user: initializedUser,
      loading: false,
      error: null,
    },
    workoutSessions: {
      workouts: workoutsForUser,
      loading: false,
      error: null,
    },
    exercises: {
      exercises: exerciseTypesForUser,
      loading: false,
      error: null,
    },
    categories: {
      categories: categories,
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
  test("renders the correct number of exercises and their categories", async () => {
    renderWithProviders(<ExercisesPage />);

    await waitFor(() => {
      expect(screen.getByText("New exercise")).toBeInTheDocument();
    });

    expect(screen.getAllByTestId(/^exercise-name-/)).toHaveLength(
      exerciseTypesForUser.length
    );

    exerciseTypesForUser.forEach((exercise) => {
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

  test("renders the 'New exercise' page when the 'New exercise' button is clicked", async () => {
    renderWithProviders(<ExercisesPage />);
    await waitFor(() => {
      expect(screen.getByText("New exercise")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("New exercise"));
    waitFor(() =>
      expect(screen.getByText("Add a new exercise")).toBeInTheDocument()
    );
  });
});
