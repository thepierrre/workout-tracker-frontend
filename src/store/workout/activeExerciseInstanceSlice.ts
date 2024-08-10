import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ExerciseInstance } from "../../interfaces/exerciseInstance.interface";

export interface ActiveExerciseInstanceState {
  activeExerciseInstance: ExerciseInstance | undefined;
}

const initialState: ActiveExerciseInstanceState = {
  activeExerciseInstance: undefined,
};

const activeExerciseInstanceSlice = createSlice({
  name: "activeExerciseInstance",
  initialState,
  reducers: {
    setActiveExerciseInstance(state, action: PayloadAction<ExerciseInstance>) {
      const exerciseInstanceToSet = action.payload;
      state.activeExerciseInstance = exerciseInstanceToSet;
    },
  },
});

export const setActiveExerciseInstance = activeExerciseInstanceSlice.actions;
export default activeExerciseInstanceSlice.reducer;
