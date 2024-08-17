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
import { exerciseTypesForUser as mutableExerciseTypesForUser } from "../../../mockData/handlers/exerciseTypesForUserHandler";
import {
  createInitialState,
  createStore,
  deepCloneExercises,
  initialExercisesList,
} from "../../../mockData/mockStore";
import ExercisesPage from "../ExercisesPage";
import SingleExercisePage from "../SingleExercisePage";

const renderWithProviders = (
  ui: React.ReactElement,
  id: string,
  store: EnhancedStore<RootState>,
) => {
  return render(
    <ChakraProvider>
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/exercises/${id}`]}>
          <Routes>
            <Route path="/exercises/:exerciseId" element={ui} />
            <Route path="/exercises" element={<ExercisesPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    </ChakraProvider>,
  );
};

describe("SingleExercisePage", () => {
  let store: EnhancedStore<RootState>;

  beforeEach(() => {
    mutableExerciseTypesForUser.length = 0;
    mutableExerciseTypesForUser.push(
      ...deepCloneExercises(initialExercisesList),
    );

    const initialState = createInitialState();
    store = createStore(initialState);
  });

  test("renders the correct exercise with the UI elements", async () => {
    renderWithProviders(
      <SingleExercisePage />,
      "a6647d9c-a926-499e-9a5f-e9f16690bfdg",
      store,
    );

    await waitFor(() => {
      expect(screen.getByText("Edit exercise")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Barbell rows")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Search by name")).toBeInTheDocument();
      expect(screen.getByText("SAVE")).toBeInTheDocument();
      expect(screen.getByText("DELETE")).toBeInTheDocument();

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

      const checkedCheckbox = screen.getByLabelText("Upper back");
      expect(checkedCheckbox).toBeChecked();

      const allCheckboxes = screen.getAllByRole("checkbox");
      const uncheckedCheckboxes = allCheckboxes.filter(
        (checkbox) => checkbox != checkedCheckbox,
      );
      uncheckedCheckboxes.forEach((checkbox) =>
        expect(checkbox).not.toBeChecked(),
      );
    });
  });

  test("throws an error when the name for a submitted exercise is empty", async () => {
    renderWithProviders(
      <SingleExercisePage />,
      "a6647d9c-a926-499e-9a5f-e9f16690bfdg",
      store,
    );

    await waitFor(() => {
      expect(screen.getByText("Edit exercise")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Barbell rows")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByDisplayValue("Barbell rows"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByText("SAVE"));
    await waitFor(() => {
      expect(
        screen.getByText("Exercise name cannot be empty."),
      ).toBeInTheDocument();
    });
  });

  test("throws an error when the name for a submitted exercise coincides with another exercise's name", async () => {
    renderWithProviders(
      <SingleExercisePage />,
      "a6647d9c-a926-499e-9a5f-e9f16690bfdk",
      store,
    );

    await waitFor(() => {
      expect(screen.getByText("Edit exercise")).toBeInTheDocument();
      expect(
        screen.getByDisplayValue("Dumbbell lateral raises"),
      ).toBeInTheDocument();
    });

    fireEvent.change(screen.getByDisplayValue("Dumbbell lateral raises"), {
      target: { value: "Bench press" },
    });

    fireEvent.click(screen.getByText("SAVE"));

    await waitFor(() => {
      expect(
        screen.getByText("An exercise with this name already exists!"),
      ).toBeInTheDocument();
    });
  });

  test("render's the exercises page with the edited exercise if a correct exercise is submitted", async () => {
    renderWithProviders(
      <SingleExercisePage />,
      "a6647d9c-a926-499e-9a5f-e9f16690bfdi",
      store,
    );

    await waitFor(() => {
      expect(screen.getByText("Edit exercise")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Pull-downs")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByDisplayValue("Pull-downs"), {
      target: { value: "edited exercise" },
    });

    await act(async () => {
      fireEvent.click(screen.getByText("SAVE"));
    });
    await waitFor(() => {
      expect(screen.getByText("New exercise")).toBeInTheDocument();
      expect(screen.getByText("edited exercise")).toBeInTheDocument();
    });
  });
});
