import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import workoutSessionsReducer from "../../../features/workout/workoutSessionsSlice";
import chosenDayReducer from "../../../features/workout/dayInCalendarSlice";
import activeExerciseInstanceReducer from "../../../features/workout/activeExerciseInstanceSlice";
import authenticatedUserReducer from "../../../features/auth/authenticatedUserSlice";
import exercisesReducer from "../../../features/exercises/exercisesSlice";
import routinesReducer from "../../../features/routines/routinesSlice";
import categoriesReducer from "../../../features/exercises/categoriesSlice";
import { workoutsForUser } from "../../../mockData/handlers/workoutsForUserHandler";
import { exerciseTypesForUser } from "../../../mockData/handlers/exerciseTypesForUserHandler";
import { categories } from "../../../mockData/handlers/categoriesHandler";
import { initializedUser } from "../../../mockData/authHandlers/userHandler";
import { routinesForUser as mutableRoutinesForUser } from "../../../mockData/handlers/routinesForUserHandler";
import { User } from "../../../interfaces/user.interface";
import { Workout } from "../../../interfaces/workout.interface";
import { Exercise } from "../../../interfaces/exercise.interface";
import { Category } from "../../../interfaces/category.interface";
import RoutinesPage from "../RoutinesPage";
import NewRoutinePage from "../NewRoutinePage";

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
    </ChakraProvider>
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
      expect(screen.getByText("Add a new routine")).toBeInTheDocument();
    });

    expect(screen.getByPlaceholderText("Enter a name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Filter")).toBeInTheDocument();
  });

  test("adds a new routine with exercises and renders the routines page when 'Create' is clicked", async () => {
    renderWithProviders(<NewRoutinePage />, store);

    await waitFor(() => {
      expect(screen.getByText("Create")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Enter a name"), {
      target: { value: "brand-new routine" },
    });

    expect(screen.getByDisplayValue("brand-new routine")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Filter")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Filter"), {
      target: { value: "bench press" },
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue("bench press")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("not selected checkbox"));

    fireEvent.click(screen.getByText("Create"));
    await waitFor(() =>
      expect(screen.getByText("New routine")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("brand-new routine")).toBeInTheDocument()
    );
  });

  test("attempt at adding a routine with no name renders an error", () => {
    renderWithProviders(<NewRoutinePage />, store);
    waitFor(() => {
      expect(screen.getByText("Create")).toBeInTheDocument();
      fireEvent.click(screen.getByText("Create"));
    });

    waitFor(() =>
      expect(
        screen.getByText("Routine name cannot be empty.")
      ).toBeInTheDocument()
    );
  });

  test("attempt at adding a routine with a name that already exists renders an error", async () => {
    renderWithProviders(<NewRoutinePage />, store);

    await waitFor(() => {
      expect(screen.getByText("Create")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Enter a name"), {
      target: { value: "Full Body Workout A" },
    });

    fireEvent.click(screen.getByText("Create"));

    waitFor(() =>
      expect(
        screen.getByText("A routine with this name already exists!")
      ).toBeInTheDocument()
    );
  });
});
