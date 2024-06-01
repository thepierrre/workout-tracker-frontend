import axiosInstance from "../../util/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Exercise } from "../../interfaces/exercise.interface";
import { exercises } from "../../util/DUMMY_DATA";

export interface ExercisesState {
  exercises: Exercise[];
  loading: boolean;
  error: string | null;
}

interface EditExercisePayload {
  exercise: Exercise;
  index: number;
}

const initialState: ExercisesState = {
  exercises: [],
  loading: false,
  error: null,
};

export const fetchExercises = createAsyncThunk<
  Exercise[], // Return type of the fulfilled action
  void, // Argument type (not needed here, so void)
  { rejectValue: string } // Type of the reject value
>("exercises/fetchExercises", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("user-exercise-types");
    return response.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const addExercise = createAsyncThunk<
  Exercise, // Return type of the fulfilled action
  Omit<Exercise, "id">, // Argument type (without id)
  { rejectValue: string } // Type of the reject value
>("exercises/addExercise", async (newExercise, thunkAPI) => {
  try {
    const response = await axiosInstance.post("exercise-types", newExercise);
    return response.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const removeExercise = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("exercises/removeExercise", async (exerciseId, thunkAPI) => {
  try {
    await axiosInstance.delete(`exercise-types/${exerciseId}`);
    return exerciseId;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    editExercise(state, action: PayloadAction<EditExercisePayload>) {
      const { exercise, index } = action.payload;
      state.exercises[index] = exercise;
    },
    // removeExercise(state, action: PayloadAction<Exercise>) {
    //   const exerciseToRemove = action.payload;
    //   state.exercises = state.exercises.filter(
    //     (exercise) => exercise.id !== exerciseToRemove.id
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExercises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchExercises.fulfilled,
        (state, action: PayloadAction<Exercise[]>) => {
          state.loading = false;
          state.exercises = action.payload;
        }
      )
      .addCase(
        fetchExercises.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch exercises.";
        }
      )
      .addCase(
        addExercise.fulfilled,
        (state, action: PayloadAction<Exercise>) => {
          state.exercises.push(action.payload);
        }
      )
      .addCase(
        addExercise.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to add the exercise.";
        }
      )
      .addCase(
        removeExercise.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.exercises = state.exercises.filter(
            (exercise) => exercise.id !== action.payload
          );
        }
      )
      .addCase(
        removeExercise.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to remove the exercise.";
        }
      );
  },
});

export const { editExercise } = exercisesSlice.actions;
export default exercisesSlice.reducer;
