import { configureStore } from "@reduxjs/toolkit";
import currentWorkoutReducer from "../features/workout/currentWorkoutSlice";

export const store = configureStore({
  reducer: {
    currentWorkout: currentWorkoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
