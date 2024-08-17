import { ChakraProvider } from "@chakra-ui/react";
import { EnhancedStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { RootState } from "../../../app/store";
import { Exercise } from "../../../interfaces/exercise.interface";
import { Routine } from "../../../interfaces/routine.interface";
import { routinesForUser as mutableRoutinesForUser } from "../../../mockData/handlers/routinesForUserHandler";
import { routinesForUser } from "../../../mockData/handlers/routinesForUserHandler";
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
        <MemoryRouter initialEntries={["/routines"]}>
          <Routes>
            <Route path="/routines" element={ui} />
            <Route path="/routines/new-routine" element={<NewRoutinePage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    </ChakraProvider>,
  );
};

describe("RoutinesPage", () => {
  let store: EnhancedStore<RootState>;

  beforeEach(() => {
    mutableRoutinesForUser.length = 0;
    mutableRoutinesForUser.push(...deepCloneRoutines(initialRoutinesList));

    const initialState = createInitialState();
    store = createStore(initialState);
  });

  test("renders the correct number of routines and their exercises", async () => {
    renderWithProviders(<RoutinesPage />, store);
    await waitFor(() => {
      const routineElements = screen.getAllByTestId(/^routine-name-/);
      expect(routineElements).toHaveLength(routinesForUser.length);

      routinesForUser.forEach((routine: Routine) => {
        const routineElement = screen.getByTestId(`routine-name-${routine.id}`);
        expect(routineElement).toBeInTheDocument();
        expect(routineElement).toHaveTextContent(routine.name);

        const exercisesElement = screen.getByTestId(
          `routine-exercises-${routine.id}`,
        );
        const expectedExercises =
          routine.routineExercises
            ?.map((exercise: Exercise) => exercise?.name.trim())
            .join(" | ") || "";
        expect(exercisesElement).toBeInTheDocument();
        expect(exercisesElement).toHaveTextContent(expectedExercises);
      });
    });
  });

  test("renders the 'New routine' page when the 'New routine' button is clicked", async () => {
    renderWithProviders(<RoutinesPage />, store);

    await waitFor(() => {
      expect(screen.getByText("New routine")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("New routine"));

    await waitFor(() => {
      expect(screen.getByText("New routine")).toBeInTheDocument();
    });
  });
});
