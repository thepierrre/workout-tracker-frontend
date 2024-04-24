import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { routines } from "../../util/DUMMY_DATA";

import { Routine } from "../../interfaces/routine.interface";

export interface RoutinesState {
  routines: Routine[];
}

const initialState: RoutinesState = {
  routines,
};

const routinesSlice = createSlice({
  name: "routinesSlice",
  initialState,
  reducers: {
    addRoutine(state, action: PayloadAction<Routine>) {
      const routine = action.payload;
      state.routines.unshift(routine);
    },
  },
});

export const { addRoutine } = routinesSlice.actions;
export default routinesSlice.reducer;
