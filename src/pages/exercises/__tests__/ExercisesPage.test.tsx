import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ExercisesPage from "../ExercisesPage";
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
import { exerciseTypesForUser as mutableExerciseTypesForUser } from "../../../mockData/handlers/exerciseTypesForUserHandler";
import { categories as initialCategories } from "../../../mockData/handlers/categoriesHandler";
import { categories } from "../../../mockData/handlers/categoriesHandler";
import { initializedUser } from "../../../mockData/authHandlers/userHandler";
import NewExercisePage from "../NewExercisePage";
import { User } from "../../../interfaces/user.interface";
import { Workout } from "../../../interfaces/workout.interface";
import { Exercise } from "../../../interfaces/exercise.interface";
import { Category } from "../../../interfaces/category.interface";

const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));

const initialExerciseTypesList = deepClone(mutableExerciseTypesForUser);

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
    exercises: deepClone(initialExerciseTypesList),
    loading: false,
    error: null,
  },
  categories: {
    categories: deepClone(initialCategories),
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
        <MemoryRouter initialEntries={["/exercises"]}>
          <Routes>
            <Route path="/exercises" element={ui} />
            <Route
              path="/exercises/new-exercise"
              element={<NewExercisePage />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    </ChakraProvider>
  );
};

describe("ExercisesPage", () => {
  let store: any;

  beforeEach(() => {
    mutableExerciseTypesForUser.length = 0;
    mutableExerciseTypesForUser.push(...deepClone(initialExerciseTypesList));

    const initialState = createInitialState();
    store = createStore(initialState);
  });

  test("renders the correct number of exercises and their categories", async () => {
    renderWithProviders(<ExercisesPage />, store);

    await waitFor(() => {
      expect(screen.getByText("New exercise")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Search for exercises")
      ).toBeInTheDocument();
    });

    expect(screen.getAllByTestId(/^exercise-name-/)).toHaveLength(
      mutableExerciseTypesForUser.length
    );

    mutableExerciseTypesForUser.forEach((exercise: Exercise) => {
      const exerciseElement = screen.getByTestId(
        `exercise-name-${exercise.id}`
      );
      expect(exerciseElement).toBeInTheDocument();
      expect(exerciseElement).toHaveTextContent(exercise.name);

      const categoriesElement = screen.getByTestId(
        `exercise-categories-${exercise.id}`
      );
      const expectedCategories = exercise.categories
        .map((category: Category) => category?.name)
        .join(" | ")
        .toUpperCase()
        .trim();
      expect(categoriesElement).toBeInTheDocument();
      expect(categoriesElement).toHaveTextContent(expectedCategories);
    });
  });

  test("renders the 'New exercise' page when the 'New exercise' button is clicked", async () => {
    renderWithProviders(<ExercisesPage />, store);

    await waitFor(() => {
      expect(screen.getByText("New exercise")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("New exercise"));

    await waitFor(() => {
      expect(screen.getByText("Add a new exercise")).toBeInTheDocument();
      expect(screen.getByText("Exercise name")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Enter a name")).toBeInTheDocument();
      expect(screen.getByText("Filter categories")).toBeInTheDocument();
      expect(screen.getByText("Create")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getAllByTestId(/^category-name-/)).toHaveLength(
        categories.length
      );
    });
  });

  test("renders only filtered exercises when the filter input is used", async () => {
    renderWithProviders(<ExercisesPage />, store);

    await waitFor(() => {
      expect(screen.getByText("New exercise")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Search for exercises"), {
      target: { value: "Dumbbell" },
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue("Dumbbell")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("dumbbell pushes")).toBeInTheDocument();
      expect(screen.getByText("dumbbell lateral raises")).toBeInTheDocument();
      expect(screen.queryByText("squats")).toBeNull();
      expect(screen.queryByText("deadlifts")).toBeNull();
      expect(screen.queryByText("bench press")).toBeNull();
      expect(screen.queryByText("incline bench press")).toBeNull();
      expect(screen.queryByText("standing calf raises")).toBeNull();
      expect(screen.queryByText("barbell rows")).toBeNull();
      expect(screen.queryByText("pull-downs")).toBeNull();
      expect(screen.queryByText("biceps barbell curls")).toBeNull();
    });
  });
});
