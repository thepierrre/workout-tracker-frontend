import { ChakraProvider } from "@chakra-ui/react";
import { EnhancedStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { RootState } from "../../../app/store";
import { Category } from "../../../interfaces/category.interface";
import { Exercise } from "../../../interfaces/exercise.interface";
import { categories } from "../../../mockData/handlers/categoriesHandler";
import { exerciseTypesForUser as mutableExerciseTypesForUser } from "../../../mockData/handlers/exerciseTypesForUserHandler";
import {
  createInitialState,
  createStore,
  deepCloneExercises,
  initialExercisesList,
} from "../../../mockData/mockStore";
import ExercisesPage from "../ExercisesPage";
import NewExercisePage from "../NewExercisePage";

const renderWithProviders = (
  ui: React.ReactElement,
  store: EnhancedStore<RootState>,
) => {
  return render(
    <ChakraProvider>
      <Provider store={store}>
        <MemoryRouter initialEntries={["/exercises"]}>
          <Routes>
            <Route path="/exercises" element={ui} />
            <Route
              path="/exercises/new-exercise"
              element={<NewExercisePage />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    </ChakraProvider>,
  );
};

describe("ExercisesPage", () => {
  let store: EnhancedStore<RootState>;

  beforeEach(() => {
    mutableExerciseTypesForUser.length = 0;
    mutableExerciseTypesForUser.push(
      ...deepCloneExercises(initialExercisesList),
    );

    const initialState = createInitialState();
    store = createStore(initialState);
  });

  test("renders the correct number of exercises and their categories", async () => {
    renderWithProviders(<ExercisesPage />, store);

    await waitFor(() => {
      expect(screen.getByText("New exercise")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Search by name")).toBeInTheDocument();
    });

    expect(screen.getAllByTestId(/^exercise-name-/)).toHaveLength(
      mutableExerciseTypesForUser.length,
    );

    mutableExerciseTypesForUser.forEach((exercise: Exercise) => {
      const exerciseElement = screen.getByTestId(
        `exercise-name-${exercise.name}`,
      );
      expect(exerciseElement).toBeInTheDocument();
      expect(exerciseElement).toHaveTextContent(exercise.name);

      const categoriesElement = screen.getByTestId(
        `exercise-categories-${exercise.id}`,
      );
      const expectedCategories = exercise.categories
        .map((category: Category) => category?.name)
        .join(" | ")
        .toUpperCase()
        .trim();
      expect(categoriesElement).toBeInTheDocument();
      expect(categoriesElement).toHaveTextContent(expectedCategories);
    });
  });

  test("renders the 'New exercise' page when the 'New exercise' button is clicked", async () => {
    renderWithProviders(<ExercisesPage />, store);

    await waitFor(() => {
      expect(screen.getByText("New exercise")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("New exercise"));

    await waitFor(() => {
      expect(screen.getByText("New exercise")).toBeInTheDocument();
      expect(screen.getByText("Exercise name")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Enter a name")).toBeInTheDocument();
      expect(screen.getByText("CREATE")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Selected muscles (0/5)")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getAllByTestId(/^category-name-/)).toHaveLength(
        categories.length,
      );
    });
  });

  test("renders only filtered exercises when the filter input is used", async () => {
    renderWithProviders(<ExercisesPage />, store);

    await waitFor(() => {
      expect(screen.getByText("New exercise")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Search by name"), {
      target: { value: "Dumbbell" },
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue("Dumbbell")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Dumbbell pushes")).toBeInTheDocument();
      expect(screen.getByText("Dumbbell lateral raises")).toBeInTheDocument();
      expect(screen.queryByText("Squats")).toBeNull();
      expect(screen.queryByText("Deadlifts")).toBeNull();
      expect(screen.queryByText("Bench press")).toBeNull();
      expect(screen.queryByText("Incline bench press")).toBeNull();
      expect(screen.queryByText("Standing calf raises")).toBeNull();
      expect(screen.queryByText("Barbell rows")).toBeNull();
      expect(screen.queryByText("Pull-downs")).toBeNull();
      expect(screen.queryByText("Biceps barbell curls")).toBeNull();
    });
  });
});
