import { ChakraProvider } from "@chakra-ui/react";
import { EnhancedStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { RootState } from "../../../app/store";
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
        <MemoryRouter initialEntries={["/exercises/new-exercise"]}>
          <Routes>
            <Route path="/exercises/new-exercise" element={ui} />
            <Route path="/exercises" element={<ExercisesPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    </ChakraProvider>,
  );
};

describe("NewExercisePage", () => {
  let store: EnhancedStore<RootState>;

  beforeEach(() => {
    mutableExerciseTypesForUser.length = 0;
    mutableExerciseTypesForUser.push(
      ...deepCloneExercises(initialExercisesList),
    );

    const initialState = createInitialState();
    store = createStore(initialState);
  });

  test("renders the heading, inputs, equipment options and categories correctly", () => {
    renderWithProviders(<NewExercisePage />, store);

    waitFor(() => {
      expect(screen.getByText("New exercise")).toBeInTheDocument();
      expect(screen.getByText("Exercise name")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Enter a name")).toBeInTheDocument();
      expect(screen.getByText("CREATE")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Search by name")).toBeInTheDocument();

      expect(
        screen.getByRole("option", { name: "Barbell" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Bodyweight" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Dumbbells" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Weight plates" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Kettlebells" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Machine" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Bar" })).toBeInTheDocument();
    });

    waitFor(() => {
      expect(screen.getAllByTestId(/^category-name-/)).toHaveLength(
        categories.length,
      );
    });
  });

  test("renders only filtered categories when the filter input is used", async () => {
    renderWithProviders(<NewExercisePage />, store);

    await waitFor(() => {
      expect(screen.getByText("New exercise")).toBeInTheDocument();
      expect(screen.getByText("Selected muscles (0/5)")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Search by name"), {
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
      expect(screen.queryByText("Barbell rows")).toBeNull();
      expect(screen.queryByText("Triceps")).toBeNull();
      expect(screen.queryByText("Biceps")).toBeNull();
      expect(screen.queryByText("Abs")).toBeNull();
      expect(screen.queryByText("Front deltoids")).toBeNull();
      expect(screen.queryByText("Middle deltoids")).toBeNull();
    });
  });

  test("displays an error when an exercise with no name is submitted", async () => {
    renderWithProviders(<NewExercisePage />, store);

    await waitFor(() => {
      expect(screen.getByText("New exercise")).toBeInTheDocument();
      expect(screen.getByText("CANCEL")).toBeInTheDocument();
      expect(screen.getByText("CREATE")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("CREATE"));
    await waitFor(() => {
      expect(
        screen.getByText("Exercise name cannot be empty."),
      ).toBeInTheDocument();
    });
  });

  test("displays an error when the exercise name coincides with another exercise", async () => {
    renderWithProviders(<NewExercisePage />, store);

    await waitFor(() =>
      expect(screen.getByText("New exercise")).toBeInTheDocument(),
    );

    fireEvent.change(screen.getByPlaceholderText("Enter a name"), {
      target: { value: "Bench press" },
    });
    expect(screen.getByDisplayValue("Bench press")).toBeInTheDocument();

    fireEvent.click(screen.getByText("CREATE"));
    await waitFor(() => {
      expect(
        screen.getByText("An exercise with this name already exists!"),
      ).toBeInTheDocument();
    });
  });

  test("renders the exercises page with a new exercise when a correct exercise is submitted", async () => {
    renderWithProviders(<NewExercisePage />, store);

    await waitFor(() =>
      expect(screen.getByText("New exercise")).toBeInTheDocument(),
    );

    fireEvent.change(screen.getByPlaceholderText("Enter a name"), {
      target: { value: "brand-new exercise" },
    });
    expect(screen.getByDisplayValue("brand-new exercise")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Search by name"), {
      target: { value: "test" },
    });
    expect(screen.getByText("Test category")).toBeInTheDocument();

    expect(screen.queryAllByRole("checkbox")).toHaveLength(1);
    await act(async () => {
      fireEvent.click(screen.getByRole("checkbox"));
    });

    await act(async () => {
      fireEvent.click(screen.getByText("CREATE"));
    });

    await waitFor(() => {
      expect(screen.getByText("Add exercise")).toBeInTheDocument();
      expect(screen.getByText("brand-new exercise")).toBeInTheDocument();
      expect(screen.getByText("TEST CATEGORY")).toBeInTheDocument();
    });
  });
});
