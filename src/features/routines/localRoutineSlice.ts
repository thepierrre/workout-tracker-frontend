import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { RoutineExercise } from "../../interfaces/routineExercise.interface";
import { WorkingSet } from "../../interfaces/workingSet.interface";

export interface LocalRoutineState {
  name: string;
  routineExercises: RoutineExercise[];
  loading: boolean;
  error: string | null;
}

const initialState: LocalRoutineState = {
  name: "",
  routineExercises: [],
  loading: false,
  error: null,
};

interface AddWorkingSetPayload {
  workingSet: WorkingSet;
  exerciseName: string;
}

export const localRoutineSlice = createSlice({
  name: "localRoutine",
  initialState,
  reducers: {
    fetch: (state) => {
      return state;
    },
    handleRoutineName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      console.log(current(state));
    },
    addExerciseLocally: (state, action: PayloadAction<RoutineExercise>) => {
      state.routineExercises.push(action.payload);
      console.log(current(state));
    },
    removeExerciseLocally: (state, action: PayloadAction<string>) => {
      state.routineExercises = state.routineExercises.filter(
        (ex) => ex.name !== action.payload
      );
      console.log(current(state));
    },
    addSetToExerciseLocally: (
      state,
      action: PayloadAction<AddWorkingSetPayload>
    ) => {
      const exercise = state.routineExercises.find(
        (ex) => ex.name === action.payload.exerciseName
      );
      if (exercise) {
        exercise.workingSets.push(action.payload.workingSet);
      }
      console.log(current(state));
    },
  },
});

export const { handleRoutineName, addExerciseLocally, removeExerciseLocally } =
  localRoutineSlice.actions;
export default localRoutineSlice.reducer;
