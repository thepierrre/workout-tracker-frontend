import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Routine } from "../../interfaces/routine.interface";
import { ExerciseInstance } from "../../interfaces/exerciseInstance.interface";

export interface CurrentWorkoutState {
  routineName: string | null;
  exerciseInstances: ExerciseInstance[];
}

const initialState: CurrentWorkoutState = {
  routineName: null,
  exerciseInstances: [],
};

const currentWorkoutSlice = createSlice({
  name: "currentWorkout",
  initialState,
  reducers: {
    setChosenRoutine(state, action: PayloadAction<Routine>) {
      const { name, exercises } = action.payload;
      state.routineName = name;
      state.exerciseInstances = exercises.map((exercise) => ({
        exercise,
        series: Array.from({ length: 3 }, () => ({ reps: 0, weight: 0 })),
      }));
    },
  },
});

export const { setChosenRoutine } = currentWorkoutSlice.actions;
export default currentWorkoutSlice.reducer;
