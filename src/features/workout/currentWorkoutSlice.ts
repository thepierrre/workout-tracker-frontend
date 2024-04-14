import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Routine } from "../../interfaces/routine.interface";

export interface CurrentWorkoutState {
  chosenRoutine: Routine | null;
}

const initialState: CurrentWorkoutState = {
  chosenRoutine: null,
};

const currentWorkoutSlice = createSlice({
  name: "currentWorkout",
  initialState,
  reducers: {
    setChosenRoutine(state, action: PayloadAction<Routine>) {
      state.chosenRoutine = action.payload;
    },
  },
});

export const { setChosenRoutine } = currentWorkoutSlice.actions;
export default currentWorkoutSlice.reducer;
