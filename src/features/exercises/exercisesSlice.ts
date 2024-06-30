import axios from "axios";
import axiosInstance from "../../util/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Exercise } from "../../interfaces/exercise.interface";

export interface ExercisesState {
  exercises: Exercise[];
  loading: boolean;
  error: string | null;
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
  Exercise,
  Omit<Exercise, "id">,
  { rejectValue: string }
>("exercises/addExercise", async (newExercise, thunkAPI) => {
  try {
    const response = await axiosInstance.post("exercise-types", newExercise);
    return response.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 409) {
        errorMessage = "An exercise with this name already exists!";
      } else {
        errorMessage = error.response.data.message;
      }
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const updateExercise = createAsyncThunk<
  Exercise,
  Exercise,
  { rejectValue: string }
>("exercises/updateExercise", async (updatedExercise, thunkAPI) => {
  try {
    const response = await axiosInstance.put(
      `exercise-types/${updatedExercise.id}`,
      updatedExercise
    );
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
  reducers: {},
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
      )
      .addCase(
        updateExercise.fulfilled,
        (state, action: PayloadAction<Exercise>) => {
          const index = state.exercises.findIndex(
            (ex) => ex.id === action.payload.id
          );
          if (index !== -1) {
            state.exercises[index] = action.payload;
          }
        }
      )
      .addCase(
        updateExercise.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to update the exercise.";
        }
      );
  },
});

export default exercisesSlice.reducer;
