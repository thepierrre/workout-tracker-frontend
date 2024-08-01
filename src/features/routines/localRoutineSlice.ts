import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RoutineExercise } from "interfaces/routineExercise.interface";

export interface LocalRoutineState {
  routineExercises: RoutineExercise[];
  loading: boolean;
  error: string | null;
}

const initialState: LocalRoutineState = {
  routineExercises: [],
  loading: false,
  error: null,
};

export const localRoutineSlice = createSlice({
  name: "localRoutine",
  initialState,
  reducers: {
    fetch: (state) => {
      return state;
    },
    addExercise: (state, action: PayloadAction<RoutineExercise>) => {
      state.routineExercises.push(action.payload);
      console.log(state);
    },
  },
});

export default localRoutineSlice.reducer;
