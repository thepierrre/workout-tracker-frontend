import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Workout } from "../../interfaces/workout.interface";
import { workouts } from "../../util/DUMMY_DATA";

export interface WorkoutSessionsState {
  workouts: Workout[];
}

const initialState: WorkoutSessionsState = {
  workouts: workouts,
};

const workoutSessionsSlice = createSlice({
  name: "workoutSessions",
  initialState,
  reducers: {
    addWorkout(state, action: PayloadAction<Workout>) {
      const workoutToAdd = action.payload;
      state.workouts.push(workoutToAdd);
    },
  },
});

export const { addWorkout } = workoutSessionsSlice.actions;
export default workoutSessionsSlice.reducer;
