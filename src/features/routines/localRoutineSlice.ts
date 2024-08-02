import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";

import { RoutineExercise } from "../../interfaces/routineExercise.interface";
import { WorkingSet } from "../../interfaces/workingSet.interface";
import { generateRandomString } from "../../util/randomValueGenerator";

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

interface AddOrUpdateWorkingSetPayload {
  workingSet: WorkingSet;
  exerciseName: string;
}

interface RemoveWorkingSetPayload {
  id: string;
  exerciseName: string;
}

export const localRoutineSlice = createSlice({
  name: "localRoutine",
  initialState,
  reducers: {
    fetchLocalRoutine: (state) => {
      console.log(current(state));
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
        (ex) => ex.name !== action.payload,
      );
      console.log(current(state));
    },
    addSetToExerciseLocally: (
      state,
      action: PayloadAction<AddOrUpdateWorkingSetPayload>,
    ) => {
      const { exerciseName, workingSet } = action.payload;
      const exercise = state.routineExercises.find(
        (ex) => ex.name === exerciseName,
      );
      if (exercise) {
        exercise.workingSets.push({
          ...workingSet,
          id: generateRandomString(),
        });
      }
      console.log(current(state));
    },
    updateSetInExerciseLocally: (
      state,
      action: PayloadAction<AddOrUpdateWorkingSetPayload>,
    ) => {
      const { exerciseName, workingSet } = action.payload;
      const exercise = state.routineExercises.find(
        (ex) => ex.name === exerciseName,
      );
      if (exercise) {
        const index = exercise.workingSets.findIndex(
          (s) => s.id === workingSet.id,
        );
        if (index !== -1) {
          exercise.workingSets[index] = workingSet;
        }
      }
      console.log(current(state));
    },
    removeSetFromExerciseLocally: (
      state,
      action: PayloadAction<RemoveWorkingSetPayload>,
    ) => {
      const { exerciseName, id } = action.payload;
      const exercise = state.routineExercises.find(
        (ex) => ex.name === exerciseName,
      );
      if (exercise) {
        exercise.workingSets = exercise.workingSets.filter(
          (set) => set.id !== id,
        );
      }
    },
  },
});

export const {
  fetchLocalRoutine,
  handleRoutineName,
  addExerciseLocally,
  removeExerciseLocally,
  addSetToExerciseLocally,
  updateSetInExerciseLocally,
  removeSetFromExerciseLocally,
} = localRoutineSlice.actions;
export default localRoutineSlice.reducer;
