import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
import userSettingsReducer from "../../../features/settings/userSettingsSlice";
import routinesReducer from "../../../features/routines/routinesSlice";
import categoriesReducer from "../../../features/exercises/categoriesSlice";
import {
  mockUser,
  mockExerciseTypes,
  mockWorkouts,
  mockCategories,
  mockRoutines,
  mockUserSettings,
} from "../../../util/testData";
import NewRoutinePage from "../NewRoutinePage";

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
    userSettings: {
      userSettings: mockUserSettings,
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

describe("NewRoutinePage", () => {
  test("renders the heading, inputs and exercises correctly", () => {
    renderWithProviders(<NewRoutinePage />);
    expect(screen.getByText("Add a new routine")).toBeInTheDocument();
    expect(screen.findByPlaceholderText("Routine name")).toBeInTheDocument();
    expect(
      screen.findByPlaceholderText("Filter exercises")
    ).toBeInTheDocument();
    expect(screen.findAllByText("Exercise1")).toHaveLength(1);
    expect(screen.findAllByText("Exercise2")).toHaveLength(1);
    expect(screen.findAllByText("Exercise3")).toHaveLength(1);
    expect(screen.findAllByText("Exercise4")).toHaveLength(1);
    expect(screen.findAllByText("Exercise5")).toHaveLength(1);
  });

  test("adds a new routine with exercises and renders the routines page when 'Create' is clicked", () => {
    renderWithProviders(<NewRoutinePage />);

    waitFor(() => {
      expect(screen.getByText("Create")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Routine name"), {
      target: { value: "Newly created" },
    });

    expect(screen.getByDisplayValue("Newly created")).toBeInTheDocument();

    waitFor(() => {
      expect(
        screen.getByPlaceholderText("Filter exercises")
      ).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Filter exercises"), {
      target: { value: "exercise1" },
    });

    waitFor(() => {
      expect(screen.getByText("Exercise1")).toBeInTheDocument();
      expect(screen.queryByText("Exercise2")).toBeNull();
      expect(screen.queryByText("Exercise3")).toBeNull();
      expect(screen.queryByText("Exercise4")).toBeNull();
      expect(screen.queryByText("Exercise5")).toBeNull();
    });

    fireEvent.click(screen.getByTestId("not selected checkbox"));

    fireEvent.click(screen.getByText("Create"));
    waitFor(() => expect(screen.getByText("New routine")).toBeInTheDocument());
    waitFor(() =>
      expect(screen.getByText("Newly created")).toBeInTheDocument()
    );
    waitFor(() => expect(screen.getAllByText("exercise1")).toHaveLength(1));
  });

  test("attempt at adding a routine with no name renders an error", () => {
    renderWithProviders(<NewRoutinePage />);
    waitFor(() => {
      expect(screen.getByText("Create.")).toBeInTheDocument();
      fireEvent.click(screen.getByText("Create"));
    });

    waitFor(() =>
      expect(screen.getByText("Routine name is required.")).toBeInTheDocument()
    );
  });
});
