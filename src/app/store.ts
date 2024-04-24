import { configureStore } from "@reduxjs/toolkit";
// import currentWorkoutReducer from "../features/workout/currentWorkoutSlice";
import workoutSessionsReducer from "../features/workout/workoutSessionsSlice";
import chosenDayReducer from "../features/workout/dayInCalendarSlice";
import activeExerciseInstanceReducer from "../features/workout/activeExerciseInstanceSlice";
import authenticatedUserReducer from "../features/auth/authenticatedUserSlice";
import exercisesReducer from "../features/exercises/exercisesSlice";
import routinesReducer from "../features/routines/routinesSlice";

export const store = configureStore({
  reducer: {
    workoutSessions: workoutSessionsReducer,
    chosenDay: chosenDayReducer,
    activeExerciseInstance: activeExerciseInstanceReducer,
    authenticatedUser: authenticatedUserReducer,
    exercises: exercisesReducer,
    routines: routinesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
