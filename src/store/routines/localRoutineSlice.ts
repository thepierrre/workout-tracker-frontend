import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";

import { Exercise } from "../../interfaces/exercise.interface";
import { WorkingSet } from "../../interfaces/workingSet.interface";
import { generateRandomString } from "../../util/randomValueGenerator";

export interface LocalRoutineState {
  name: string;
  routineExercises: Exercise[];
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
    clearLocalRoutine: (state) => {
      state.name = "";
      state.routineExercises = [];
    },
    handleRoutineName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateExercisesInRoutine: (state, action: PayloadAction<Exercise[]>) => {
      state.routineExercises = action.payload;
    },
    addExerciseLocally: (
      state,
      action: PayloadAction<Omit<Exercise, "id">>,
    ) => {
      state.routineExercises.push(action.payload);
    },
    removeExerciseLocally: (state, action: PayloadAction<string>) => {
      state.routineExercises = state.routineExercises.filter(
        (ex) => ex.name !== action.payload,
      );
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
        exercise.workingSets?.push({
          ...workingSet,
          id: generateRandomString(),
        });
      }
    },
    updateSetInExerciseLocally: (
      state,
      action: PayloadAction<AddOrUpdateWorkingSetPayload>,
    ) => {
      const { exerciseName, workingSet } = action.payload;
      const exercise = state.routineExercises.find(
        (ex) => ex.name === exerciseName,
      );
      if (exercise && exercise.workingSets) {
        const index = exercise.workingSets.findIndex(
          (s) => s.id === workingSet.id,
        );
        if (index !== -1) {
          exercise.workingSets[index] = workingSet;
        }
      }
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
        exercise.workingSets = exercise.workingSets?.filter(
          (set) => set.id !== id,
        );
      }
    },
  },
});

export const {
  clearLocalRoutine,
  fetchLocalRoutine,
  handleRoutineName,
  updateExercisesInRoutine,
  addExerciseLocally,
  removeExerciseLocally,
  addSetToExerciseLocally,
  updateSetInExerciseLocally,
  removeSetFromExerciseLocally,
} = localRoutineSlice.actions;
export default localRoutineSlice.reducer;
