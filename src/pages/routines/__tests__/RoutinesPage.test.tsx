import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RoutinesPage from "../RoutinesPage";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import workoutSessionsReducer from "../../../features/workout/workoutSessionsSlice";
import chosenDayReducer from "../../../features/workout/dayInCalendarSlice";
import activeExerciseInstanceReducer from "../../../features/workout/activeExerciseInstanceSlice";
import authenticatedUserReducer from "../../../features/auth/authenticatedUserSlice";
import userSettingsReducer from "../../../features/settings/userSettingsSlice";
import exercisesReducer from "../../../features/exercises/exercisesSlice";
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
        <MemoryRouter initialEntries={["/routines"]}>
          <Routes>
            <Route path="/routines" element={ui} />
            <Route path="/routines/new-routine" element={<NewRoutinePage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    </ChakraProvider>
  );
};

describe("RoutinesPage", () => {
  test("renders the 'New routine' button correctly", async () => {
    renderWithProviders(<RoutinesPage />);
    await waitFor(() =>
      expect(screen.getByText("New routine")).toBeInTheDocument()
    );
  });

  test("renders the correct number of routines and their exercises", async () => {
    renderWithProviders(<RoutinesPage />);
    await waitFor(() => {
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
  });

  test("renders the 'New routine' page when the 'New routine' button is clicked", async () => {
    renderWithProviders(<RoutinesPage />);

    waitFor(() => {
      expect(screen.getByText("New routine")).toBeInTheDocument();
      fireEvent.click(screen.getByText("New routine"));
    });

    await waitFor(() => {
      expect(screen.getByText("Add a new routine")).toBeInTheDocument();
    });
  });
});
