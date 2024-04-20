import { configureStore } from "@reduxjs/toolkit";
// import currentWorkoutReducer from "../features/workout/currentWorkoutSlice";
import workoutSessionsReducer from "../features/workout/workoutSessionsSlice";
import chosenDayReducer from "../features/workout/dayInCalendarSlice";
import activeExerciseInstanceReducer from "../features/workout/activeExerciseInstanceSlice";
import authenticatedUserReducer from "../features/auth/authenticatedUserSlice";

export const store = configureStore({
  reducer: {
    // currentWorkout: currentWorkoutReducer,
    workoutSessions: workoutSessionsReducer,
    chosenDay: chosenDayReducer,
    activeExerciseInstance: activeExerciseInstanceReducer,
    authenticatedUser: authenticatedUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
