import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { routines } from "../../util/DUMMY_DATA";

import { Routine } from "../../interfaces/routine.interface";

export interface RoutinesState {
  routines: Routine[];
}

interface EditRoutinePayload {
  routine: Routine;
  index: number;
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
    editRoutine(state, action: PayloadAction<EditRoutinePayload>) {
      const { routine, index } = action.payload;
      state.routines[index] = routine;
    },
    removeRoutine(state, action: PayloadAction<Routine>) {
      const routineToRemove = action.payload;
      state.routines = state.routines.filter(
        (routine) => routine.id !== routineToRemove.id
      );
    },
  },
});

export const { addRoutine, editRoutine, removeRoutine } = routinesSlice.actions;
export default routinesSlice.reducer;
