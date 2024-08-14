import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { format } from "date-fns";

import { Workout } from "../interfaces/workout.interface";
import { workoutsForUser as mutableWorkoutsForUser } from "../mockData/handlers/workoutsForUserHandler";
import { authenticatedUserState } from "../store/auth/authenticatedUserSlice";
import authenticatedUserReducer from "../store/auth/authenticatedUserSlice";
import categoriesReducer, {
  CategoriesState,
} from "../store/exercises/categoriesSlice";
import exercisesReducer, {
  ExercisesState,
} from "../store/exercises/exercisesSlice";
import localRoutineReducer, {
  LocalRoutineState,
} from "../store/routines/localRoutineSlice";
import routinesReducer, {
  RoutinesState,
} from "../store/routines/routinesSlice";
import userSettingsReducer, {
  UserSettingsState,
} from "../store/settings/userSettingsSlice";
import activeExerciseInstanceReducer, {
  ActiveExerciseInstanceState,
} from "../store/workout/activeExerciseInstanceSlice";
import chosenDayReducer, {
  DayInCalendarState,
} from "../store/workout/dayInCalendarSlice";
import workoutSessionsReducer, {
  WorkoutSessionsState,
} from "../store/workout/workoutSessionsSlice";
import { categories } from "./handlers/categoriesHandler";
import { exerciseTypesForUser } from "./handlers/exerciseTypesForUserHandler";
import { routinesForUser } from "./handlers/routinesForUserHandler";
import { initializedUser } from "./handlers/userHandler";
import { userSettings } from "./handlers/userSettingsHandler";

export const deepClone = (obj: Workout[]) => JSON.parse(JSON.stringify(obj));

export const initialWorkoutsList = deepClone(mutableWorkoutsForUser);

// Define InitialState interface based on RootState
export interface InitialState {
  authenticatedUser: authenticatedUserState;
  chosenDay: DayInCalendarState;
  workoutSessions: WorkoutSessionsState;
  activeExerciseInstance: ActiveExerciseInstanceState;
  exercises: ExercisesState;
  categories: CategoriesState;
  routines: RoutinesState;
  localRoutine: LocalRoutineState;
  userSettings: UserSettingsState;
}

export const createInitialState = (): RootState => ({
  authenticatedUser: {
    user: initializedUser,
    loading: false,
    error: null,
  },
  chosenDay: { day: format(new Date(), "dd/MM/yyyy") },
  workoutSessions: {
    workouts: deepClone(initialWorkoutsList),
    loading: false,
    error: null,
  },
  activeExerciseInstance: {
    activeExerciseInstance: undefined,
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
  routines: {
    routines: routinesForUser,
    loading: false,
    error: null,
  },
  localRoutine: {
    name: "",
    routineExercises: [],
    loading: false,
    error: null,
  },
  userSettings: {
    userSettings: userSettings,
    loading: false,
    error: null,
  },
});

export const createStore = (
  initialState: InitialState,
): EnhancedStore<RootState> => {
  return configureStore({
    reducer: {
      workoutSessions: workoutSessionsReducer,
      chosenDay: chosenDayReducer,
      activeExerciseInstance: activeExerciseInstanceReducer,
      authenticatedUser: authenticatedUserReducer,
      exercises: exercisesReducer,
      routines: routinesReducer,
      categories: categoriesReducer,
      userSettings: userSettingsReducer,
      localRoutine: localRoutineReducer,
    },
    preloadedState: initialState,
  });
};
