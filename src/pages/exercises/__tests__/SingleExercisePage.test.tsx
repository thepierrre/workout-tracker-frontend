import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
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
import { initializedUser } from "../../../mockData/authHandlers/userHandler";
import { User } from "../../../interfaces/user.interface";
import { Workout } from "../../../interfaces/workout.interface";
import { Exercise } from "../../../interfaces/exercise.interface";
import { Category } from "../../../interfaces/category.interface";
import SingleExercisePage from "../SingleExercisePage";

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

const renderWithProviders = (
  ui: React.ReactElement,
  id: string,
  store: any
) => {
  return render(
    <ChakraProvider>
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/exercises/${id}`]}>
          <Routes>
            <Route path="/exercises/:exerciseId" element={ui} />
            <Route path="/exercises" element={<ExercisesPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    </ChakraProvider>
  );
};

describe("SingleExercisePage", () => {
  let store: any;

  beforeEach(() => {
    mutableExerciseTypesForUser.length = 0;
    mutableExerciseTypesForUser.push(...deepClone(initialExerciseTypesList));

    const initialState = createInitialState();
    store = createStore(initialState);
  });

  test("renders the correct exercise with the UI elements", async () => {
    renderWithProviders(
      <SingleExercisePage />,
      "a6647d9c-a926-499e-9a5f-e9f16690bfdg",
      store
    );

    await waitFor(() => {
      expect(screen.getByText("Edit exercise")).toBeInTheDocument();
      expect(screen.getByDisplayValue("barbell rows")).toBeInTheDocument();
      expect(screen.getByText("Filter categories")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
      expect(screen.getByText("Update")).toBeInTheDocument();
      expect(screen.getByText("Delete exercise")).toBeInTheDocument();

      const checkedCheckbox = screen.getByLabelText("Upper back");
      expect(checkedCheckbox).toBeChecked();

      const allCheckboxes = screen.getAllByRole("checkbox");
      const uncheckedCheckboxes = allCheckboxes.filter(
        (checkbox) => checkbox != checkedCheckbox
      );
      uncheckedCheckboxes.forEach((checkbox) =>
        expect(checkbox).not.toBeChecked()
      );
    });
  });

  test("throws an error when the name for a submitted exercise is empty", async () => {
    renderWithProviders(
      <SingleExercisePage />,
      "a6647d9c-a926-499e-9a5f-e9f16690bfdg",
      store
    );

    await waitFor(() => {
      expect(screen.getByText("Edit exercise")).toBeInTheDocument();
      expect(screen.getByDisplayValue("barbell rows")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByDisplayValue("barbell rows"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByText("Update"));
    await waitFor(() => {
      expect(
        screen.getByText("Exercise name cannot be empty.")
      ).toBeInTheDocument();
    });
  });

  test("throws an error when the name for a submitted exercise coincides with another exercise's name", async () => {
    renderWithProviders(
      <SingleExercisePage />,
      "a6647d9c-a926-499e-9a5f-e9f16690bfdk",
      store
    );

    await waitFor(() => {
      expect(screen.getByText("Edit exercise")).toBeInTheDocument();
      expect(
        screen.getByDisplayValue("dumbbell lateral raises")
      ).toBeInTheDocument();
    });

    fireEvent.change(screen.getByDisplayValue("dumbbell lateral raises"), {
      target: { value: "bench press" },
    });

    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(
        screen.getByText("An exercise with this name already exists!")
      ).toBeInTheDocument();
    });
  });

  test("render's the exercises page with the edited exercise if a correct exercise is submitted", async () => {
    renderWithProviders(
      <SingleExercisePage />,
      "a6647d9c-a926-499e-9a5f-e9f16690bfdi",
      store
    );

    await waitFor(() => {
      expect(screen.getByText("Edit exercise")).toBeInTheDocument();
      expect(screen.getByDisplayValue("pull-downs")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByDisplayValue("pull-downs"), {
      target: { value: "edited exercise" },
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId("submit-button"));
    });
    await waitFor(() => {
      expect(screen.getByText("New exercise")).toBeInTheDocument();
      expect(screen.getByText("edited exercise")).toBeInTheDocument();
    });
  });
});
