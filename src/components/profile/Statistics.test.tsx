import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import Statistics from "./Statistics";
import { Workout } from "../../interfaces/workout.interface";
import { Routine } from "../../interfaces/routine.interface";
import { Exercise } from "../../interfaces/exercise.interface";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { BrowserRouter } from "react-router-dom";

const workouts: Workout[] = [
  {
    id: "id1",
    creationDate: "2024-05-30",
    routineName: "routine1",
    exerciseInstances: [],
  },
];

const routines: Routine[] = [
  {
    id: "id1",
    name: "routine1",
    exerciseTypes: [],
    userId: "userId1",
  },
  {
    id: "id2",
    name: "routine2",
    exerciseTypes: [],
    userId: "userId1",
  },
];

const exercises: Exercise[] = [
  {
    id: "id1",
    name: "exercise1",
    categories: [],
    userId: "userId1",
  },
  {
    id: "id2",
    name: "exercise2",
    categories: [],
    userId: "userId1",
  },
  {
    id: "id3",
    name: "exercise3",
    categories: [],
    userId: "userId1",
  },
];

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider>
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
    </ChakraProvider>
  );
};

describe("Statistics component", () => {
  test("displays the heading", () => {
    renderWithProviders(
      <Statistics
        workouts={workouts}
        routines={routines}
        exercises={exercises}
      />
    );
    expect(screen.getByText("Statistics")).toBeInTheDocument();
  });

  test("displays the correct number of workouts", () => {
    renderWithProviders(
      <Statistics
        workouts={workouts}
        routines={routines}
        exercises={exercises}
      />
    );
    expect(screen.getByText("Workouts:")).toBeInTheDocument();
    expect(screen.getByText(workouts.length.toString())).toBeInTheDocument();
  });
});
