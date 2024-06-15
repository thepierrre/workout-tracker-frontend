import axios from "axios";
import axiosInstance from "../../util/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Workout } from "../../interfaces/workout.interface";
import { workouts } from "../../util/DUMMY_DATA";

export interface WorkoutSessionsState {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
}

const initialState: WorkoutSessionsState = {
  workouts: workouts,
  loading: false,
  error: null,
};

interface ExerciseInstance {
  id: string;
  exerciseTypeName: string;
  workingSets: Series[];
}

interface Series {
  id: string;
  reps: number;
  weight: number;
}

interface WorkingSetArgs {
  exerciseInstanceId: string;
  newSet: Omit<Series, "id">;
}

// Omit<Series, "id">,

export const addSet = createAsyncThunk<
  ExerciseInstance,
  WorkingSetArgs,
  { rejectValue: string }
>(
  "workouts/addWorkingSet",
  async ({ exerciseInstanceId, newSet }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `exercise-instances/${exerciseInstanceId}/sets`,
        newSet
      );
      console.log(response.data);
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
    // console.log(response.data);
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
    // console.log(newWorkout);
    const response = await axiosInstance.post("workouts", newWorkout);
    // console.log(response.data);
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
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

const workoutSessionsSlice = createSlice({
  name: "workoutSessions",
  initialState,
  reducers: {
    // addSeriesToWorkout(state, action: PayloadAction<SeriesPayload>) {
    //   const { workoutId, exerciseInstanceId, series } = action.payload;
    //   const workout = state.workouts.find((wrk) => wrk.id === workoutId);
    //   if (workout) {
    //     const exerciseInstance = workout.exerciseInstances.find(
    //       (exInstance) => exInstance.id === exerciseInstanceId
    //     );
    //     if (exerciseInstance) {
    //       exerciseInstance.workingSets.push(series);
    //     }
    //   }
    // },
    // updateSeriesInWorkout(state, action: PayloadAction<SeriesPayload>) {
    //   const { workoutId, exerciseInstanceId, series } = action.payload;
    //   const workout = state.workouts.find((wrk) => wrk.id === workoutId);
    //   if (workout) {
    //     const exerciseInstance = workout.exerciseInstances.find(
    //       (exInstance) => exInstance.id === exerciseInstanceId
    //     );
    //     if (exerciseInstance) {
    //       const i = exerciseInstance.workingSets.findIndex(
    //         (s) => s.id === series.id
    //       );
    //       exerciseInstance.workingSets.splice(i, 1, series);
    //     }
    //   }
    // },
    // deleteSeriesFromWorkout(state, action: PayloadAction<SeriesPayload>) {
    //   const { workoutId, exerciseInstanceId, series } = action.payload;
    //   const workout = state.workouts.find((wrk) => wrk.id === workoutId);
    //   if (workout) {
    //     const exerciseInstance = workout.exerciseInstances.find(
    //       (exInstance) => exInstance.id === exerciseInstanceId
    //     );
    //     if (exerciseInstance) {
    //       const i = exerciseInstance.workingSets.findIndex(
    //         (s) => s.id === series.id
    //       );
    //       exerciseInstance.workingSets.splice(i, 1);
    //     }
    //   }
    // },
  },
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
      );
  },
});

export const {
  // addSeriesToWorkout,
  // updateSeriesInWorkout,
  // deleteSeriesFromWorkout,
} = workoutSessionsSlice.actions;
export default workoutSessionsSlice.reducer;
