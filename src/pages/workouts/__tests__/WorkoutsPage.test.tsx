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
import { format } from "date-fns";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { RootState } from "../../../app/store";
import { workoutsForUser as mutableWorkoutsForUser } from "../../../mockData/handlers/workoutsForUserHandler";
import {
  createInitialState,
  createStore,
  deepCloneWorkouts,
  initialWorkoutsList,
} from "../../../mockData/mockStore";
import ExercisesPage from "../../exercises/ExercisesPage";
import WorkoutsPage from "../WorkoutsPage";

const renderWithProviders = (
  ui: React.ReactElement,
  store: EnhancedStore<RootState>,
) => {
  return render(
    <ChakraProvider>
      <Provider store={store}>
        <MemoryRouter initialEntries={["/workouts"]}>
          <Routes>
            <Route path="/workouts" element={ui} />
            <Route path="/exercises" element={<ExercisesPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    </ChakraProvider>,
  );
};

describe("WorkoutsPage", () => {
  let store: EnhancedStore<RootState>;

  beforeEach(() => {
    mutableWorkoutsForUser.length = 0;
    mutableWorkoutsForUser.push(...deepCloneWorkouts(initialWorkoutsList));

    const initialState = createInitialState();
    store = createStore(initialState);
  });

  test("renders the calendar and workouts for the current day", async () => {
    renderWithProviders(<WorkoutsPage />, store);

    await waitFor(() => {
      expect(
        screen.getByText(format(new Date(), "EEE").toUpperCase()),
      ).toBeInTheDocument();
    });

    expect(screen.getByText("Add workout")).toBeInTheDocument();
    expect(screen.getByText("Full Body Workout A")).toBeInTheDocument();
    expect(screen.getByText("Bench press")).toBeInTheDocument();
    expect(screen.getByText("Barbell rows")).toBeInTheDocument();
    expect(screen.getByText("Squats")).toBeInTheDocument();
    expect(screen.getByText("Dumbbell pushes")).toBeInTheDocument();
    expect(screen.getAllByText("Delete workout")).toHaveLength(1);
  });

  test("opens the sliding element with all routines when 'Add workout' is clicked", async () => {
    renderWithProviders(<WorkoutsPage />, store);

    await waitFor(() => {
      expect(screen.getByText("Add workout")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Add workout"));
    expect(screen.getByText("Select a routine")).toBeInTheDocument();
    expect(screen.queryAllByText("Full Body Workout A")).toHaveLength(2);
    expect(screen.getByText("Full Body Workout B")).toBeInTheDocument();
  });

  test("adds a new routine to the current day when a new routine is selected", async () => {
    renderWithProviders(<WorkoutsPage />, store);

    await waitFor(() => {
      expect(screen.getByText("Add workout")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Add workout"));

    await waitFor(() => {
      expect(screen.getByText("Full Body Workout B")).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Full Body Workout B"));
    });

    await waitFor(() =>
      expect(screen.queryAllByText("Select a routine")).toHaveLength(0),
    );

    await waitFor(() => {
      expect(screen.getByText("Full Body Workout A")).toBeInTheDocument();
      expect(screen.getByText("Full Body Workout B")).toBeInTheDocument();
    });
  });

  test("removes a workout when 'Delete workout' is clicked", async () => {
    renderWithProviders(<WorkoutsPage />, store);

    await waitFor(() => {
      expect(screen.getByText("Full Body Workout A")).toBeInTheDocument();
      expect(screen.queryAllByText("Full Body Workout B")).toHaveLength(0);
    });

    fireEvent.click(screen.getByText("Delete workout"));
    await waitFor(() => {
      expect(
        screen.getByText("Do you really want to delete this workout?"),
      ).toBeInTheDocument();
    });
    await act(async () => {
      fireEvent.click(screen.getByText("Delete"));
    });

    await waitFor(() => {
      expect(screen.queryByText("Full Body Workout A")).toBeNull();
      expect(screen.queryByText("Delete workout")).toBeNull();
    });
  });
});
