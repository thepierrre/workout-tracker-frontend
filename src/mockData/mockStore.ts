import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { format } from "date-fns";
import { Exercise } from "interfaces/exercise.interface";

import { Routine } from "../interfaces/routine.interface";
import { Workout } from "../interfaces/workout.interface";
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
import { exerciseTypesForUser as mutableExerciseTypesForUser } from "./handlers/exerciseTypesForUserHandler";
import { routinesForUser as mutableRoutinesForUser } from "./handlers/routinesForUserHandler";
import { initializedUser } from "./handlers/userHandler";
import { userSettings } from "./handlers/userSettingsHandler";
import { workoutsForUser as mutableWorkoutsForUser } from "./handlers/workoutsForUserHandler";

export const deepCloneWorkouts = (obj: Workout[]) =>
  JSON.parse(JSON.stringify(obj));
export const deepCloneRoutines = (obj: Routine[]) =>
  JSON.parse(JSON.stringify(obj));
export const deepCloneExercises = (obj: Exercise[]) =>
  JSON.parse(JSON.stringify(obj));

export const initialWorkoutsList = deepCloneWorkouts(mutableWorkoutsForUser);
export const initialRoutinesList = deepCloneRoutines(mutableRoutinesForUser);
export const initialExercisesList = deepCloneExercises(
  mutableExerciseTypesForUser,
);

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
    workouts: deepCloneWorkouts(initialWorkoutsList),
    loading: false,
    error: null,
  },
  activeExerciseInstance: {
    activeExerciseInstance: undefined,
  },
  exercises: {
    exercises: deepCloneExercises(initialExercisesList),
    loading: false,
    error: null,
  },
  categories: {
    categories: categories,
    loading: false,
    error: null,
  },
  routines: {
    routines: deepCloneRoutines(initialRoutinesList),
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
