import { render, screen } from "@testing-library/react";
import SingleExercisePage from "./SingleExercisePage";
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

const renderWithProviders = (
  ui: React.ReactElement,
  { route = "/exercises/1" } = {}
) => {
  return render(
    <ChakraProvider>
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="/exercises/:exerciseId" element={ui} />
          </Routes>
        </MemoryRouter>
      </Provider>
    </ChakraProvider>
  );
};

describe("SingleExercisePage", () => {
  test("renders the correct exercise", () => {
    renderWithProviders(<SingleExercisePage />);

    expect(screen.getByText("Edit exercise")).toBeInTheDocument();
    expect(screen.getByDisplayValue("exercise1")).toBeInTheDocument();
  });
});
