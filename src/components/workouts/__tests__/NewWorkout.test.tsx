import { ChakraProvider } from "@chakra-ui/react";
import { EnhancedStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { RootState } from "app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import {
  createInitialState,
  createStore,
  deepClone,
  initialWorkoutsList,
} from "../../../mockData/mockStore";
import NewWorkout from "../NewWorkout";

const renderWithProviders = (
  ui: React.ReactElement,
  store: EnhancedStore<RootState>,
) => {
  return render(
    <ChakraProvider>
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
    </ChakraProvider>,
  );
};

describe("SingleRoutine", () => {
  let store: EnhancedStore<RootState>;

  beforeEach(() => {
    const initialState = createInitialState();
    store = createStore(initialState);
  });

  test("renders the drawer for choosing a new workout", async () => {
    renderWithProviders(<NewWorkout />, store);

    fireEvent.click(screen.getByText("New workout"));
    expect(screen.getByText("Select a routine")).toBeInTheDocument();
    expect(screen.getByText("Full Body Workout A")).toBeInTheDocument();
    expect(screen.getByText("Full Body Workout B")).toBeInTheDocument();
    expect(screen.getAllByText("4 EXERCISES")).toHaveLength(2);
    expect(
      screen.getByText("Bench press | Barbell rows | Squats | Dumbbell pushes"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Incline bench press | Pull-downs | Deadlifts | Dumbbell lateral raises",
      ),
    ).toBeInTheDocument();
  });
});
