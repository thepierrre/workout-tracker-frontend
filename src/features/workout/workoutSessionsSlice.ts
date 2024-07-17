import axios from "axios";
import axiosInstance from "../../util/axiosInstance.ts";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Workout } from "../../interfaces/workout.interface";
import { Exercise } from "interfaces/exercise.interface";

export interface WorkoutSessionsState {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
}

const initialState: WorkoutSessionsState = {
  workouts: [],
  loading: false,
  error: null,
};

interface ExerciseInstance {
  id: string;
  exerciseTypeName: string;
  workingSets: workingSet[];
}

interface workingSet {
  id: string;
  reps: number;
  weight: number;
}

interface AddworkingSetArgs {
  exerciseInstanceId: string;
  newSet: Omit<workingSet, "id">;
}

interface updateworkingSetArgs {
  exerciseInstanceId: string;
  workingSetId: string;
  setToUpdate: Omit<workingSet, "id">;
}

interface DeleteworkingSetArgs {
  exerciseInstanceId: string;
  workingSetId: string;
}

interface AddExerciseInstanceArgs {
  exerciseType: Omit<Exercise, "id" | "categories">;
  workoutId: string;
}

export const deleteSet = createAsyncThunk<
  ExerciseInstance,
  DeleteworkingSetArgs,
  { rejectValue: string }
>(
  "workouts/deleteworkingSet",
  async ({ exerciseInstanceId, workingSetId }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        `exercise-instances/${exerciseInstanceId}/sets/${workingSetId}`
      );
      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const addSet = createAsyncThunk<
  ExerciseInstance,
  AddworkingSetArgs,
  { rejectValue: string }
>(
  "workouts/addworkingSet",
  async ({ exerciseInstanceId, newSet }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `exercise-instances/${exerciseInstanceId}/sets`,
        newSet
      );
      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const updateSet = createAsyncThunk<
  ExerciseInstance,
  updateworkingSetArgs,
  { rejectValue: string }
>(
  "workouts/updateworkingSet",
  async ({ exerciseInstanceId, workingSetId, setToUpdate }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `exercise-instances/${exerciseInstanceId}/sets/${workingSetId}`,
        setToUpdate
      );
      return response.data;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const fetchWorkouts = createAsyncThunk<
  Workout[],
  void,
  { rejectValue: string }
>("workouts/fetchWorkouts", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("user-workouts");
    return response.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const addWorkout = createAsyncThunk<
  Workout, // Return type of the fulfilled action
  Omit<Workout, "id" | "exerciseInstances">, // Argument type (without id)
  { rejectValue: string } // Type of the reject value
>("workouts/addWorkout", async (newWorkout, thunkAPI) => {
  try {
    const response = await axiosInstance.post("workouts", newWorkout);
    return response.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const removeWorkout = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("workouts/removeWorkout", async (workoutId, thunkAPI) => {
  try {
    await axiosInstance.delete(`workouts/${workoutId}`);
    return workoutId;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (axios.isAxiosError(error) && error.response) {
      console.log("Axios error response:", error.response);

      errorMessage = error.response.data.message;
    } else if (error instanceof Error) {
      console.log("Non-Axios error:", error);
      errorMessage = error.message;
    } else {
      console.log("Unexpected error type:", error);
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
export const removeExInstance = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("workouts/removeExInstance", async (exInstanceId, thunkAPI) => {
  try {
    await axiosInstance.delete(`exercise-instances/${exInstanceId}`);
    return exInstanceId;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const addExInstance = createAsyncThunk<
  { workoutId: string; exerciseInstance: ExerciseInstance },
  AddExerciseInstanceArgs,
  { rejectValue: string }
>("workouts/addExInstance", async (args, thunkAPI) => {
  const { workoutId, exerciseType } = args;
  try {
    const response = await axiosInstance.post(
      `workouts/${workoutId}/exercise-instances`,
      exerciseType
    );
    return { workoutId, exerciseInstance: response.data };
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

const workoutSessionsSlice = createSlice({
  name: "workoutSessions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWorkouts.fulfilled,
        (state, action: PayloadAction<Workout[]>) => {
          state.loading = false;
          state.workouts = action.payload;
        }
      )
      .addCase(
        fetchWorkouts.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch exercises.";
        }
      )
      .addCase(
        addWorkout.fulfilled,
        (state, action: PayloadAction<Workout>) => {
          state.workouts.push(action.payload);
        }
      )
      .addCase(
        addWorkout.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to add the workout.";
        }
      )
      .addCase(
        removeWorkout.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.workouts = state.workouts.filter(
            (workout) => workout.id !== action.payload
          );
        }
      )
      .addCase(
        removeWorkout.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to remove the workout.";
        }
      )
      .addCase(
        addExInstance.fulfilled,
        (
          state,
          action: PayloadAction<{
            workoutId: string;
            exerciseInstance: ExerciseInstance;
          }>
        ) => {
          const { workoutId, exerciseInstance } = action.payload;
          const workout = state.workouts.find((w) => w.id === workoutId);
          if (workout) {
            workout.exerciseInstances.push(exerciseInstance);
          }
        }
      )
      .addCase(
        addExInstance.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error =
            action.payload || "Failed to add the exercise to the workout.";
        }
      )
      .addCase(
        removeExInstance.fulfilled,
        (state, action: PayloadAction<string>) => {
          const deletedExInstanceId = action.payload;
          const workout = state.workouts.find((workout) =>
            workout.exerciseInstances.some(
              (instance) => instance.id === deletedExInstanceId
            )
          );

          if (workout) {
            workout.exerciseInstances.filter(
              (exInstance) => exInstance.id !== deletedExInstanceId
            );
          }
        }
      )
      .addCase(
        addSet.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to add the set.";
        }
      )
      .addCase(
        addSet.fulfilled,
        (state, action: PayloadAction<ExerciseInstance>) => {
          const updatedExerciseInstance = action.payload;
          const workout = state.workouts.find((workout) =>
            workout.exerciseInstances.some(
              (instance) => instance.id === updatedExerciseInstance.id
            )
          );

          if (workout) {
            const exerciseInstanceIndex = workout.exerciseInstances.findIndex(
              (instance) => instance.id === updatedExerciseInstance.id
            );
            workout.exerciseInstances[exerciseInstanceIndex] =
              updatedExerciseInstance;
          }
        }
      )
      .addCase(
        updateSet.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to update the set.";
        }
      )
      .addCase(
        updateSet.fulfilled,
        (state, action: PayloadAction<ExerciseInstance>) => {
          const updatedExerciseInstance = action.payload;
          const workout = state.workouts.find((workout) =>
            workout.exerciseInstances.some(
              (instance) => instance.id === updatedExerciseInstance.id
            )
          );

          if (workout) {
            const exerciseInstanceIndex = workout.exerciseInstances.findIndex(
              (instance) => instance.id === updatedExerciseInstance.id
            );
            workout.exerciseInstances[exerciseInstanceIndex] =
              updatedExerciseInstance;
          }
        }
      )
      .addCase(
        deleteSet.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to delete the set.";
        }
      )
      .addCase(
        deleteSet.fulfilled,
        (state, action: PayloadAction<ExerciseInstance>) => {
          const updatedExerciseInstance = action.payload;
          const workout = state.workouts.find((workout) =>
            workout.exerciseInstances.some(
              (instance) => instance.id === updatedExerciseInstance.id
            )
          );

          if (workout) {
            const exerciseInstanceIndex = workout.exerciseInstances.findIndex(
              (instance) => instance.id === updatedExerciseInstance.id
            );
            workout.exerciseInstances[exerciseInstanceIndex] =
              updatedExerciseInstance;
          }
        }
      );
  },
});

export const {} = workoutSessionsSlice.actions;
export default workoutSessionsSlice.reducer;
