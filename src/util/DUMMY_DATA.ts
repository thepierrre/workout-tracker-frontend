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
    id: "workout-id1",
    creationDate: date1,
    routineName: "Full Body 1",
    exerciseInstances: [
      {
        id: "instance-id1",
        exercise: exercises[0],
        series: [series1, series2, series3],
      },
      {
        id: "instance-id2",
        exercise: exercises[1],
        series: [series4, series5, series6],
      },
      {
        id: "instance-id3",
        exercise: exercises[2],
        series: [series7, series8, series9],
      },
    ],
  },
  {
    id: "workout-id2",
    creationDate: date2,
    routineName: "Full Body 1",
    exerciseInstances: [
      {
        id: "instance-id4",
        exercise: exercises[0],
        series: [series1, series2, series2],
      },
      {
        id: "instance-id5",
        exercise: exercises[1],
        series: [series4, series4, series5],
      },
      {
        id: "instance-id6",
        exercise: exercises[2],
        series: [series4, series5, series5],
      },
    ],
  },
  {
    id: "workout-id3",
    creationDate: date3,
    routineName: "Full Body 2",
    exerciseInstances: [
      {
        id: "instance-id7",
        exercise: exercises[3],
        series: [series1, series2, series3],
      },
      {
        id: "instance-id8",
        exercise: exercises[4],
        series: [series4, series5, series6],
      },
      {
        id: "instance-id9",
        exercise: exercises[5],
        series: [series7, series8, series9],
      },
      {
        id: "instance-id10",
        exercise: exercises[6],
        series: [series7, series8, series9],
      },
    ],
  },
];
