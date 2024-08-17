import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { Exercise } from "../../interfaces/exercise.interface";
import { WorkingSet } from "../../interfaces/workingSet.interface";

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
  id?: string;
  temporaryId?: string;
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
    updateExercisesInRoutine: (
      state,
      action: PayloadAction<Omit<Exercise[], "exerciseOrder">>,
    ) => {
      state.routineExercises = action.payload;
    },
    addExerciseLocally: (
      state,
      action: PayloadAction<
        Omit<Exercise, "id" | "isDefault" | "exerciseOrder">
      >,
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
          temporaryId: uuidv4(),
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
        const index = exercise.workingSets.findIndex((set) => {
          if (set.id) {
            return set.id === workingSet.id;
          } else if (set.temporaryId) {
            return set.temporaryId === workingSet.temporaryId;
          }
          return false;
        });
        if (index !== -1) {
          exercise.workingSets[index] = workingSet;
        }
      }
    },
    removeSetFromExerciseLocally: (
      state,
      action: PayloadAction<RemoveWorkingSetPayload>,
    ) => {
      const { exerciseName, id, temporaryId } = action.payload;
      const exercise = state.routineExercises.find(
        (ex) => ex.name === exerciseName,
      );
      if (exercise) {
        exercise.workingSets = exercise.workingSets?.filter((set) => {
          if (set.id) {
            return set.id !== id;
          } else if (set.temporaryId) {
            return set.temporaryId !== temporaryId;
          }
          return true;
        });
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
