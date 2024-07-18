import { format } from "date-fns";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
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
import { workoutsForUser as mutableWorkoutsForUser } from "../../../mockData/handlers/workoutsForUserHandler";
import { exerciseTypesForUser } from "../../../mockData/handlers/exerciseTypesForUserHandler";
import { categories } from "../../../mockData/handlers/categoriesHandler";
import { initializedUser } from "../../../mockData/authHandlers/userHandler";
import ExercisesPage from "../../exercises/ExercisesPage";
import WorkoutsPage from "../WorkoutsPage";
import { User } from "../../../interfaces/user.interface";
import { Workout } from "../../../interfaces/workout.interface";
import { Exercise } from "../../../interfaces/exercise.interface";
import { Category } from "../../../interfaces/category.interface";

const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));

const initialWorkoutsList = deepClone(mutableWorkoutsForUser);

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
    workouts: deepClone(initialWorkoutsList),
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
        <MemoryRouter initialEntries={["/workouts"]}>
          <Routes>
            <Route path="/workouts" element={ui} />
            <Route path="/exercises" element={<ExercisesPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    </ChakraProvider>
  );
};

describe("WorkoutsPage", () => {
  let store: any;

  beforeEach(() => {
    mutableWorkoutsForUser.length = 0;
    mutableWorkoutsForUser.push(...deepClone(initialWorkoutsList));

    const initialState = createInitialState();
    store = createStore(initialState);
  });

  test("renders the calendar and workouts for the current day", async () => {
    renderWithProviders(<WorkoutsPage />, store);

    await waitFor(() => {
      expect(
        screen.getByText(format(new Date(), "EEE").toUpperCase())
      ).toBeInTheDocument();
    });

    expect(screen.getByText("New workout")).toBeInTheDocument();
    expect(screen.getByText("Full Body Workout A")).toBeInTheDocument();
    expect(screen.getByText("bench press")).toBeInTheDocument();
    expect(screen.getByText("barbell rows")).toBeInTheDocument();
    expect(screen.getByText("squats")).toBeInTheDocument();
    expect(screen.getByText("dumbbell pushes")).toBeInTheDocument();
    expect(screen.getAllByText("Delete workout")).toHaveLength(1);
  });

  test("opens the sliding element with all routines when 'New workout' is clicked", async () => {
    renderWithProviders(<WorkoutsPage />, store);

    await waitFor(() => {
      expect(screen.getByText("New workout")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("New workout"));
    expect(screen.getByText("Select a routine")).toBeInTheDocument();
    expect(screen.queryAllByText("Full Body Workout A")).toHaveLength(2);
    expect(screen.getByText("Full Body Workout B")).toBeInTheDocument();
  });

  test("adds a new routine to the current day when a new routine is selected", async () => {
    renderWithProviders(<WorkoutsPage />, store);

    await waitFor(() => {
      expect(screen.getByText("New workout")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("New workout"));

    await act(async () => {
      fireEvent.click(screen.getByText("Full Body Workout B"));
    });

    await waitFor(() =>
      expect(screen.queryAllByText("Select a routine")).toHaveLength(0)
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
        screen.getByText("Do you really want to delete this workout?")
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
