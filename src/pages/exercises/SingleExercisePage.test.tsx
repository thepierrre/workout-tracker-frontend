import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

const renderWithProviders = (ui: React.ReactElement) => {
  const route = "/exercises/1";
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
  test("renders the correct exercise with the UI elements", () => {
    renderWithProviders(<SingleExercisePage />);

    expect(screen.getByText("Edit exercise")).toBeInTheDocument();
    expect(screen.getByDisplayValue("exercise1")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Filter categories")
    ).toBeInTheDocument();
    expect(screen.getByText("Update")).toBeInTheDocument();
    expect(screen.getByText("Remove exercise")).toBeInTheDocument();
    expect(screen.getByText("Category1")).toBeInTheDocument();
    const selectedCategories = screen.getAllByTestId("selected category");

    expect(selectedCategories).toHaveLength(2);
    const notSelectedCategories = screen.getAllByTestId(
      "not selected category"
    );
    expect(notSelectedCategories).toHaveLength(4);
  });

  test("updating the name and categories renders an updated exercise", () => {
    renderWithProviders(<SingleExercisePage />);

    const selectedCategories = screen.getAllByTestId("selected category");
    expect(selectedCategories).toHaveLength(2);

    const notSelectedCheckbox = screen.getAllByTestId(
      "not selected checkbox"
    )[0];
    fireEvent.click(notSelectedCheckbox);

    waitFor(() => {
      const updatedSelectedCategories =
        screen.getAllByTestId("selected category");
      expect(updatedSelectedCategories).toHaveLength(3);
    });

    fireEvent.change(screen.getByDisplayValue("exercise1"), {
      target: { value: "edited exercise" },
    });

    fireEvent.click(screen.getByText("Update"));
    waitFor(() => expect(screen.getByText("New exercise")).toBeInTheDocument());
    waitFor(() =>
      expect(screen.getByText("edited exercise")).toBeInTheDocument()
    );
  });

  test("clicking on the 'Remove exercise' button removes the exercise", () => {
    renderWithProviders(<SingleExercisePage />);

    fireEvent.click(screen.getByText("Remove exercise"));
    waitFor(() => expect(screen.getByText("New exercise")).toBeInTheDocument());
    waitFor(() => expect(screen.queryByText("exercise1")).toBeNull());
  });
});
