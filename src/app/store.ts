import { configureStore } from "@reduxjs/toolkit";

import authenticatedUserReducer from "../store/auth/authenticatedUserSlice";
import categoriesReducer from "../store/exercises/categoriesSlice";
import exercisesReducer from "../store/exercises/exercisesSlice";
import localRoutineReducer from "../store/routines/localRoutineSlice";
import routinesReducer from "../store/routines/routinesSlice";
import userSettingsReducer from "../store/settings/userSettingsSlice";
import activeExerciseInstanceReducer from "../store/workout/activeExerciseInstanceSlice";
import chosenDayReducer from "../store/workout/dayInCalendarSlice";
import workoutSessionsReducer from "../store/workout/workoutSessionsSlice";

export const store = configureStore({
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
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
