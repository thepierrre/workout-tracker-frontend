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
import NewRoutinePage from "../NewRoutinePage";
import RoutinesPage from "../RoutinesPage";

const renderWithProviders = (
  ui: React.ReactElement,
  store: EnhancedStore<RootState>,
) => {
  return render(
    <ChakraProvider>
      <Provider store={store}>
        <MemoryRouter initialEntries={["/routines/new-routine"]}>
          <Routes>
            <Route path="/routines/new-routine" element={ui} />
            <Route path="/routines" element={<RoutinesPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    </ChakraProvider>,
  );
};

describe("NewRoutinePage", () => {
  let store: EnhancedStore<RootState>;

  beforeEach(() => {
    mutableRoutinesForUser.length = 0;
    mutableRoutinesForUser.push(...deepCloneRoutines(initialRoutinesList));

    const initialState = createInitialState();
    store = createStore(initialState);
  });

  test("renders the heading, inputs and exercises correctly", async () => {
    renderWithProviders(<NewRoutinePage />, store);
    await waitFor(() => {
      expect(screen.getByText("New routine")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Enter a name")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Search by name")).toBeInTheDocument();
    });
  });

  test("adds a new routine with exercises and renders the routines page when 'Create' is clicked", async () => {
    renderWithProviders(<NewRoutinePage />, store);

    await waitFor(() => {
      expect(screen.getByText("New routine")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Enter a name")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Enter a name"), {
      target: { value: "brand-new routine" },
    });

    expect(screen.getByDisplayValue("brand-new routine")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Search by name")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Search by name"), {
      target: { value: "Incline bench press" },
    });

    await waitFor(() => {
      expect(
        screen.getByDisplayValue("Incline bench press"),
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("not selected checkbox"));

    fireEvent.click(screen.getByText("CREATE"));
    await waitFor(() =>
      expect(screen.getByText("New routine")).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(screen.getByText("brand-new routine")).toBeInTheDocument(),
    );
  });

  test("attempt at adding a routine with no name renders an error", () => {
    renderWithProviders(<NewRoutinePage />, store);
    waitFor(() => {
      expect(screen.getByText("CREATE")).toBeInTheDocument();
      fireEvent.click(screen.getByText("CREATE"));
    });

    waitFor(() =>
      expect(
        screen.getByText("Routine name cannot be empty."),
      ).toBeInTheDocument(),
    );
  });

  test("attempt at adding a routine with a name that already exists renders an error", async () => {
    renderWithProviders(<NewRoutinePage />, store);

    await waitFor(() => {
      expect(screen.getByText("CREATE")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Enter a name")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Enter a name"), {
      target: { value: "Full Body Workout A" },
    });

    fireEvent.click(screen.getByText("CREATE"));

    waitFor(() =>
      expect(
        screen.getByText("A routine with this name already exists!"),
      ).toBeInTheDocument(),
    );
  });
});
