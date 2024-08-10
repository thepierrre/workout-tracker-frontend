import { ChakraProvider } from "@chakra-ui/react";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { Category } from "../../../interfaces/category.interface";
import { Exercise } from "../../../interfaces/exercise.interface";
import { User } from "../../../interfaces/user.interface";
import { Workout } from "../../../interfaces/workout.interface";
import { initializedUser } from "../../../mockData/authHandlers/userHandler";
import { categories } from "../../../mockData/handlers/categoriesHandler";
import { exerciseTypesForUser } from "../../../mockData/handlers/exerciseTypesForUserHandler";
import { routinesForUser as mutableRoutinesForUser } from "../../../mockData/handlers/routinesForUserHandler";
import { workoutsForUser } from "../../../mockData/handlers/workoutsForUserHandler";
import authenticatedUserReducer from "../../../store/auth/authenticatedUserSlice";
import categoriesReducer from "../../../store/exercises/categoriesSlice";
import exercisesReducer from "../../../store/exercises/exercisesSlice";
import routinesReducer from "../../../store/routines/routinesSlice";
import activeExerciseInstanceReducer from "../../../store/workout/activeExerciseInstanceSlice";
import chosenDayReducer from "../../../store/workout/dayInCalendarSlice";
import workoutSessionsReducer from "../../../store/workout/workoutSessionsSlice";
import RoutinesPage from "../RoutinesPage";
import SingleRoutinePage from "../SingleRoutinePage";

const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));

const initialRoutinesList = deepClone(mutableRoutinesForUser);

interface AuthenticatedUserState {
  user: User;
  loading: boolean;
  error: any;
}

interface WorkoutSessionsState {
  workouts: Workout[];
  loading: boolean;
  error: any;
}

interface ExercisesState {
  exercises: Exercise[];
  loading: boolean;
  error: any;
}

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: any;
}

interface InitialState {
  authenticatedUser: AuthenticatedUserState;
  workoutSessions: WorkoutSessionsState;
  exercises: ExercisesState;
  categories: CategoriesState;
}

const createInitialState = () => ({
  authenticatedUser: {
    user: initializedUser,
    loading: false,
    error: null,
  },
  workoutSessions: {
    workouts: workoutsForUser,
    loading: false,
    error: null,
  },
  exercises: {
    exercises: exerciseTypesForUser,
    loading: false,
    error: null,
  },
  categories: {
    categories: categories,
    loading: false,
    error: null,
  },
});

const createStore = (initialState: InitialState) => {
  return configureStore({
    reducer: {
      workoutSessions: workoutSessionsReducer,
      chosenDay: chosenDayReducer,
      activeExerciseInstance: activeExerciseInstanceReducer,
      authenticatedUser: authenticatedUserReducer,
      exercises: exercisesReducer,
      routines: routinesReducer,
      categories: categoriesReducer,
    },
    preloadedState: initialState,
  });
};

const renderWithProviders = (
  ui: React.ReactElement,
  id: string,
  store: any,
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
  let store: any;

  beforeEach(() => {
    mutableRoutinesForUser.length = 0;
    mutableRoutinesForUser.push(...deepClone(initialRoutinesList));

    const initialState = createInitialState();
    store = createStore(initialState);
  });

  test("renders the correct routine with the UI elements", async () => {
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
      expect(screen.getByPlaceholderText("Filter")).toBeInTheDocument();
      expect(screen.getByText("Update")).toBeInTheDocument();
      expect(screen.getByText("Delete routine")).toBeInTheDocument();
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
      expect(screen.getByPlaceholderText("Filter")).toBeInTheDocument();
      expect(screen.getByText("Update")).toBeInTheDocument();
      expect(screen.getByText("Delete routine")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByDisplayValue("Full Body Workout A"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByText("Update"));
    await waitFor(() => {
      expect(
        screen.getByText("Routine name cannot be empty."),
      ).toBeInTheDocument();
    });
  });
});
