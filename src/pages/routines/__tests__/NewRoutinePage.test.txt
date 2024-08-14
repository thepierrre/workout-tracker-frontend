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
import { categories } from "../../../mockData/handlers/categoriesHandler";
import { exerciseTypesForUser } from "../../../mockData/handlers/exerciseTypesForUserHandler";
import { routinesForUser as mutableRoutinesForUser } from "../../../mockData/handlers/routinesForUserHandler";
import { initializedUser } from "../../../mockData/handlers/userHandler";
import { workoutsForUser } from "../../../mockData/handlers/workoutsForUserHandler";
import authenticatedUserReducer from "../../../store/auth/authenticatedUserSlice";
import categoriesReducer from "../../../store/exercises/categoriesSlice";
import exercisesReducer from "../../../store/exercises/exercisesSlice";
import localRoutineReducer from "../../../store/routines/localRoutineSlice";
import routinesReducer from "../../../store/routines/routinesSlice";
import activeExerciseInstanceReducer from "../../../store/workout/activeExerciseInstanceSlice";
import chosenDayReducer from "../../../store/workout/dayInCalendarSlice";
import workoutSessionsReducer from "../../../store/workout/workoutSessionsSlice";
import NewRoutinePage from "../NewRoutinePage";
import RoutinesPage from "../RoutinesPage";

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
  localRoutine: {
    name: "",
    routineExercises: [],
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
      localRoutine: localRoutineReducer,
    },
    preloadedState: initialState,
  });
};

const renderWithProviders = (ui: React.ReactElement, store: any) => {
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
  let store: any;

  beforeEach(() => {
    mutableRoutinesForUser.length = 0;
    mutableRoutinesForUser.push(...deepClone(initialRoutinesList));

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
