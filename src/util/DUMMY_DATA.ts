import { Exercise } from "../interfaces/exercise.interface";
import { Routine } from "../interfaces/routine.interface";
import { Workout } from "../interfaces/workout.interface";
import { Series } from "../interfaces/series.interface";
import { ExerciseInstance } from "../interfaces/exerciseInstance.interface";

export const exercises: Exercise[] = [
  { name: "Barbell bench press", categories: ["upper body", "chest"] },
  { name: "Barbell rows", categories: ["upper body", "back"] },
  { name: "Dumbbell lateral raise", categories: ["upper body", "shoulders"] },
  { name: "Barbell squats", categories: ["lower body", "glutes", "quads"] },
  {
    name: "Barbell deadlifts",
    categories: ["lower body", "glutes", "hamstrings", "lower back"],
  },
  { name: "Pulldowns", categories: ["upper body", "back"] },
  { name: "Abs candles", categories: ["upper body", "abs"] },
];

export const routines: Routine[] = [
  {
    name: "Full Body 1",
    exercises: [exercises[0], exercises[1], exercises[2]],
  },
  {
    name: "Full Body 2",
    exercises: [exercises[3], exercises[4], exercises[5], exercises[6]],
  },
];

const series1: Series = { reps: 10, weight: 30 };
const series2: Series = { reps: 10, weight: 35 };
const series3: Series = { reps: 14, weight: 35 };
const series4: Series = { reps: 12, weight: 50 };
const series5: Series = { reps: 12, weight: 40 };
const series6: Series = { reps: 11, weight: 30 };
const series7: Series = { reps: 9, weight: 30 };
const series8: Series = { reps: 9, weight: 60 };
const series9: Series = { reps: 8, weight: 60 };

const date1 = new Date(2024, 3, 15);
const date2 = new Date(2024, 4, 1);
const date3 = new Date(2024, 4, 14);

export const workouts: Workout[] = [
  {
    creationDate: date1,
    routineName: "Full Body 1",
    exerciseInstances: [
      {
        exercise: exercises[0],
        series: [series1, series2, series3],
      },
      {
        exercise: exercises[1],
        series: [series4, series5, series6],
      },
      {
        exercise: exercises[2],
        series: [series7, series8, series9],
      },
    ],
  },
  {
    creationDate: date1,
    routineName: "Full Body 1",
    exerciseInstances: [
      {
        exercise: exercises[0],
        series: [series1, series2, series2],
      },
      {
        exercise: exercises[1],
        series: [series4, series4, series5],
      },
      {
        exercise: exercises[2],
        series: [series4, series5, series5],
      },
    ],
  },
  {
    creationDate: date1,
    routineName: "Full Body 2",
    exerciseInstances: [
      {
        exercise: exercises[3],
        series: [series1, series2, series3],
      },
      {
        exercise: exercises[4],
        series: [series4, series5, series6],
      },
      {
        exercise: exercises[5],
        series: [series7, series8, series9],
      },
      {
        exercise: exercises[6],
        series: [series7, series8, series9],
      },
    ],
  },
];
