import { ChakraProvider } from "@chakra-ui/react";
import { EnhancedStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { RootState } from "../../../app/store";
import { routinesForUser as mutableRoutinesForUser } from "../../../mockData/handlers/routinesForUserHandler";
import {
  createInitialState,
  createStore,
  deepCloneRoutines,
  initialRoutinesList,
} from "../../../mockData/mockStore";
import RoutinesPage from "../RoutinesPage";
import SingleRoutinePage from "../SingleRoutinePage";

const renderWithProviders = (
  ui: React.ReactElement,
  id: string,
  store: EnhancedStore<RootState>,
) => {
  return render(
    <ChakraProvider>
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/routines/${id}`]}>
          <Routes>
            <Route path="/routines/:routineId" element={ui} />
            <Route path="/routines" element={<RoutinesPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    </ChakraProvider>,
  );
};

describe("SingleRoutinePage", () => {
  let store: EnhancedStore<RootState>;

  beforeEach(() => {
    mutableRoutinesForUser.length = 0;
    mutableRoutinesForUser.push(...deepCloneRoutines(initialRoutinesList));

    const initialState = createInitialState();
    store = createStore(initialState);
  });

  test("renders the correct routine", async () => {
    renderWithProviders(
      <SingleRoutinePage />,
      "916ee32a-728f-4eea-a3g6-d0e097b22b21",
      store,
    );

    await waitFor(() => {
      expect(screen.getByText("Edit routine")).toBeInTheDocument();
      expect(
        screen.getByDisplayValue("Full Body Workout A"),
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Search by name")).toBeInTheDocument();
      expect(screen.getByText("SAVE")).toBeInTheDocument();
      expect(screen.getByText("DELETE")).toBeInTheDocument();
    });

    const benchPressCheckbox = screen.getByLabelText("Bench press");
    expect(benchPressCheckbox).toBeChecked();
    const barbellRowsCheckbox = screen.getByLabelText("Barbell rows");
    expect(barbellRowsCheckbox).toBeChecked();
    const squatsCheckbox = screen.getByLabelText("Squats");
    expect(squatsCheckbox).toBeChecked();
    const dumbbellPushesCheckbox = screen.getByLabelText("Dumbbell pushes");
    expect(dumbbellPushesCheckbox).toBeChecked();

    const allCheckboxes = screen.getAllByRole("checkbox");
    const uncheckedCheckboxes = allCheckboxes.filter(
      (checkbox) =>
        checkbox != benchPressCheckbox &&
        checkbox != barbellRowsCheckbox &&
        checkbox != squatsCheckbox &&
        checkbox != dumbbellPushesCheckbox,
    );
    uncheckedCheckboxes.forEach((checkbox) =>
      expect(checkbox).not.toBeChecked(),
    );
  });

  test("throws an error when a routine with no name is submitted", async () => {
    renderWithProviders(
      <SingleRoutinePage />,
      "916ee32a-728f-4eea-a3g6-d0e097b22b21",
      store,
    );

    await waitFor(() => {
      expect(screen.getByText("Edit routine")).toBeInTheDocument();
      expect(
        screen.getByDisplayValue("Full Body Workout A"),
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Search by name")).toBeInTheDocument();
      expect(screen.getByText("SAVE")).toBeInTheDocument();
      expect(screen.getByText("DELETE")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByDisplayValue("Full Body Workout A"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByText("SAVE"));
    await waitFor(() => {
      expect(
        screen.getByText("Routine name cannot be empty."),
      ).toBeInTheDocument();
    });
  });
});
