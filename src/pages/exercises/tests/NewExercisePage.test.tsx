import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import NewExercisePage from "../NewExercisePage";
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
import { workoutsForUser } from "../../../mockData/handlers/workoutsForUserHandler";
import { categories } from "../../../mockData/handlers/categoriesHandler";
import { initializedUser } from "../../../mockData/authHandlers/initializeUserHandler";
import { exerciseTypesForUser } from "../../../mockData/handlers/exerciseTypesForUserHandler";

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

describe("NewExercisePage", () => {
  test("renders the heading, inputs and categories correctly", () => {
    renderWithProviders(<NewExercisePage />);

    waitFor(() => {
      expect(screen.getByText("Add a new exercise")).toBeInTheDocument();
      expect(screen.getByText("Exercise name")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Enter a name")).toBeInTheDocument();
      expect(screen.getByText("Filter categories")).toBeInTheDocument();
      expect(screen.getByText("Create")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    });

    waitFor(() => {
      expect(screen.getAllByTestId(/^category-name-/)).toHaveLength(
        categories.length
      );
    });
  });

  test("renders only filtered categories when the filter input is used", async () => {
    renderWithProviders(<NewExercisePage />);

    await waitFor(() => {
      expect(screen.getByText("Add a new exercise")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "c" },
    });
    expect(screen.getByDisplayValue("c")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Chest")).toBeInTheDocument();
      expect(screen.getByText("Calves")).toBeInTheDocument();
      expect(screen.queryByText("Glutes")).toBeNull();
      expect(screen.queryByText("Hamstrings")).toBeNull();
      expect(screen.queryByText("Quadriceps")).toBeNull();
      expect(screen.queryByText("Lower back")).toBeNull();
      expect(screen.queryByText("Upper back")).toBeNull();
      expect(screen.queryByText("barbell rows")).toBeNull();
      expect(screen.queryByText("Triceps")).toBeNull();
      expect(screen.queryByText("Biceps")).toBeNull();
      expect(screen.queryByText("Abs")).toBeNull();
      expect(screen.queryByText("Front deltoids")).toBeNull();
      expect(screen.queryByText("Middle deltoids")).toBeNull();
    });
  });

  test("displays an error when an exercise with no name is submitted", async () => {
    renderWithProviders(<NewExercisePage />);

    await waitFor(() =>
      expect(screen.getByText("Add a new exercise")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Create"));
    await waitFor(() => {
      expect(
        screen.getByText("Exercise name cannot be empty.")
      ).toBeInTheDocument();
    });
  });

  // test("renders the exercise page with a new exercise when a correct exercise is submitted", () => {
  //   renderWithProviders(<NewExercisePage />);

  //   waitFor(() =>
  //     expect(screen.getByText("Add a new exercise")).toBeInTheDocument()
  //   );

  //   fireEvent.change(screen.getByPlaceholderText("Enter a name"), {
  //     target: { value: "test exercise" },
  //   });
  //   expect(screen.getByDisplayValue("test exercise")).toBeInTheDocument();

  //   fireEvent.change(screen.getByPlaceholderText("Search"), {
  //     target: { value: "test" },
  //   });
  //   waitFor(() => {
  //     expect(screen.getByDisplayValue("Test category")).toBeInTheDocument();
  //     fireEvent.click(
  //       screen.getByTestId("checkbox-categry-name-test category")
  //     );
  //   });

  //   fireEvent.click(screen.getByText("Create"));

  //   waitFor(() => {
  //     expect(screen.getByText("New exercise")).toBeInTheDocument();
  //     expect(screen.getByText("test exercise")).toBeInTheDocument();
  //     expect(screen.getByText("Test category")).toBeInTheDocument();
  //   });
  // });
});
