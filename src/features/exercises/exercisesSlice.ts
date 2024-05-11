import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Exercise } from "../../interfaces/exercise.interface";
import { exercises } from "../../util/DUMMY_DATA";

export interface ExercisesState {
  exercises: Exercise[];
}

interface EditExercisePayload {
  exercise: Exercise;
  index: number;
}

const initialState: ExercisesState = {
  exercises: exercises,
};

const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    addExercise(state, action: PayloadAction<Exercise>) {
      state.exercises.push(action.payload);
    },
    editExercise(state, action: PayloadAction<EditExercisePayload>) {
      const { exercise, index } = action.payload;
      state.exercises[index] = exercise;
    },
  },
});

export const { addExercise, editExercise } = exercisesSlice.actions;
export default exercisesSlice.reducer;
