import { render, screen } from "@testing-library/react";
import SingleRoutinePage from "./SingleRoutinePage";
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
  mockCategories,
  mockExerciseTypes,
  mockRoutines,
} from "../../util/testData";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom";

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
  const route = "/routines/2";
  return render(
    <ChakraProvider>
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="/routines/:routineId" element={ui} />
          </Routes>
        </MemoryRouter>
      </Provider>
    </ChakraProvider>
  );
};

describe("SingleRoutinePage", () => {
  test("renders the correct routine with the UI elements", () => {
    renderWithProviders(<SingleRoutinePage />);

    expect(screen.getByText("Edit routine")).toBeInTheDocument();
    expect(screen.getByDisplayValue("routine2")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Filter exercises")).toBeInTheDocument();
    expect(screen.getByText("Update")).toBeInTheDocument();
    expect(screen.getByText("Remove routine")).toBeInTheDocument();
    const selectedExercises = screen.getAllByTestId("selected exercise");

    expect(selectedExercises).toHaveLength(1);
    const notSelectedExercises = screen.getAllByTestId("not selected exercise");
    expect(notSelectedExercises).toHaveLength(4);
  });
});
