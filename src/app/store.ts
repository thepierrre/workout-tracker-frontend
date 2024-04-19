import { configureStore } from "@reduxjs/toolkit";
// import currentWorkoutReducer from "../features/workout/currentWorkoutSlice";
import workoutSessionsReducer from "../features/workout/workoutSessionsSlice";
import chosenDayReducer from "../features/workout/dayInCalendarSlice";

export const store = configureStore({
  reducer: {
    // currentWorkout: currentWorkoutReducer,
    workoutSessions: workoutSessionsReducer,
    chosenDay: chosenDayReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
