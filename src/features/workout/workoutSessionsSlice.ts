import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Workout } from "../../interfaces/workout.interface";
import { Series } from "../../interfaces/series.interface";
import { workouts } from "../../util/DUMMY_DATA";

export interface WorkoutSessionsState {
  workouts: Workout[];
}

const initialState: WorkoutSessionsState = {
  workouts: workouts,
};

interface SeriesPayload {
  workoutId: string;
  exerciseInstanceId: string;
  series: Series;
}

const workoutSessionsSlice = createSlice({
  name: "workoutSessions",
  initialState,
  reducers: {
    addWorkout(state, action: PayloadAction<Workout>) {
      const workoutToAdd = action.payload;
      state.workouts.unshift(workoutToAdd);
    },
    removeWorkout(state, action: PayloadAction<Workout>) {
      const workoutToRemove = action.payload;
      state.workouts = state.workouts.filter(
        (workout) => workout.id !== workoutToRemove.id
      );
    },
    addSeriesToWorkout(state, action: PayloadAction<SeriesPayload>) {
      const { workoutId, exerciseInstanceId, series } = action.payload;
      const workout = state.workouts.find((wrk) => wrk.id === workoutId);
      if (workout) {
        const exerciseInstance = workout.exerciseInstances.find(
          (exInstance) => exInstance.id === exerciseInstanceId
        );
        if (exerciseInstance) {
          exerciseInstance.series.push(series);
        }
      }
    },
    updateSeriesInWorkout(state, action: PayloadAction<SeriesPayload>) {
      const { workoutId, exerciseInstanceId, series } = action.payload;
      const workout = state.workouts.find((wrk) => wrk.id === workoutId);
      if (workout) {
        const exerciseInstance = workout.exerciseInstances.find(
          (exInstance) => exInstance.id === exerciseInstanceId
        );
        if (exerciseInstance) {
          const i = exerciseInstance.series.findIndex(
            (s) => s.id === series.id
          );
          exerciseInstance.series.splice(i, 1, series);
        }
      }
    },
    deleteSeriesFromWorkout(state, action: PayloadAction<SeriesPayload>) {
      const { workoutId, exerciseInstanceId, series } = action.payload;
      const workout = state.workouts.find((wrk) => wrk.id === workoutId);
      if (workout) {
        const exerciseInstance = workout.exerciseInstances.find(
          (exInstance) => exInstance.id === exerciseInstanceId
        );
        if (exerciseInstance) {
          const i = exerciseInstance.series.findIndex(
            (s) => s.id === series.id
          );
          exerciseInstance.series.splice(i, 1);
        }
      }
    },
  },
});

export const {
  addWorkout,
  addSeriesToWorkout,
  updateSeriesInWorkout,
  deleteSeriesFromWorkout,
  removeWorkout,
} = workoutSessionsSlice.actions;
export default workoutSessionsSlice.reducer;
