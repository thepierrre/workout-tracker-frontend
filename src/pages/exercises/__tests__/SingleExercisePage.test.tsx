import { ChakraProvider } from "@chakra-ui/react";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { Category } from "../../../interfaces/category.interface";
import { Exercise } from "../../../interfaces/exercise.interface";
import { User } from "../../../interfaces/user.interface";
import { Workout } from "../../../interfaces/workout.interface";
import { initializedUser } from "../../../mockData/authHandlers/userHandler";
import { categories as initialCategories } from "../../../mockData/handlers/categoriesHandler";
import { exerciseTypesForUser as mutableExerciseTypesForUser } from "../../../mockData/handlers/exerciseTypesForUserHandler";
import { workoutsForUser } from "../../../mockData/handlers/workoutsForUserHandler";
import authenticatedUserReducer from "../../../store/auth/authenticatedUserSlice";
import categoriesReducer from "../../../store/exercises/categoriesSlice";
import exercisesReducer from "../../../store/exercises/exercisesSlice";
import routinesReducer from "../../../store/routines/routinesSlice";
import activeExerciseInstanceReducer from "../../../store/workout/activeExerciseInstanceSlice";
import chosenDayReducer from "../../../store/workout/dayInCalendarSlice";
import workoutSessionsReducer from "../../../store/workout/workoutSessionsSlice";
import ExercisesPage from "../ExercisesPage";
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
  store: any,
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
    </ChakraProvider>,
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
      store,
    );

    await waitFor(() => {
      expect(screen.getByText("Edit exercise")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Barbell rows")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Search by name")).toBeInTheDocument();
      expect(screen.getByText("SAVE")).toBeInTheDocument();
      expect(screen.getByText("DELETE")).toBeInTheDocument();

      const checkedCheckbox = screen.getByLabelText("Upper back");
      expect(checkedCheckbox).toBeChecked();

      const allCheckboxes = screen.getAllByRole("checkbox");
      const uncheckedCheckboxes = allCheckboxes.filter(
        (checkbox) => checkbox != checkedCheckbox,
      );
      uncheckedCheckboxes.forEach((checkbox) =>
        expect(checkbox).not.toBeChecked(),
      );
    });
  });

  test("throws an error when the name for a submitted exercise is empty", async () => {
    renderWithProviders(
      <SingleExercisePage />,
      "a6647d9c-a926-499e-9a5f-e9f16690bfdg",
      store,
    );

    await waitFor(() => {
      expect(screen.getByText("Edit exercise")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Barbell rows")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByDisplayValue("Barbell rows"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByText("SAVE"));
    await waitFor(() => {
      expect(
        screen.getByText("Exercise name cannot be empty."),
      ).toBeInTheDocument();
    });
  });

  test("throws an error when the name for a submitted exercise coincides with another exercise's name", async () => {
    renderWithProviders(
      <SingleExercisePage />,
      "a6647d9c-a926-499e-9a5f-e9f16690bfdk",
      store,
    );

    await waitFor(() => {
      expect(screen.getByText("Edit exercise")).toBeInTheDocument();
      expect(
        screen.getByDisplayValue("Dumbbell lateral raises"),
      ).toBeInTheDocument();
    });

    fireEvent.change(screen.getByDisplayValue("Dumbbell lateral raises"), {
      target: { value: "Bench press" },
    });

    fireEvent.click(screen.getByText("SAVE"));

    await waitFor(() => {
      expect(
        screen.getByText("An exercise with this name already exists!"),
      ).toBeInTheDocument();
    });
  });

  test("render's the exercises page with the edited exercise if a correct exercise is submitted", async () => {
    renderWithProviders(
      <SingleExercisePage />,
      "a6647d9c-a926-499e-9a5f-e9f16690bfdi",
      store,
    );

    await waitFor(() => {
      expect(screen.getByText("Edit exercise")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Pull-downs")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByDisplayValue("Pull-downs"), {
      target: { value: "edited exercise" },
    });

    await act(async () => {
      fireEvent.click(screen.getByText("SAVE"));
    });
    await waitFor(() => {
      expect(screen.getByText("New exercise")).toBeInTheDocument();
      expect(screen.getByText("edited exercise")).toBeInTheDocument();
    });
  });
});
