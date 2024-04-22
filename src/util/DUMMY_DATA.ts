import { Exercise } from "../interfaces/exercise.interface";
import { Routine } from "../interfaces/routine.interface";
import { Workout } from "../interfaces/workout.interface";
import { Series } from "../interfaces/series.interface";
import { User } from "../interfaces/user.interface";
import { passwords } from "./DUMY_PASSWORDS";

export const exercises: Exercise[] = [
  {
    id: "exercise-id1",
    name: "Barbell bench press",
    categories: ["upper body", "chest"],
    userId: "user-id1",
  },
  {
    id: "exercise-id2",
    name: "Barbell rows",
    categories: ["upper body", "back"],
    userId: "user-id1",
  },
  {
    id: "exercise-id3",
    name: "Dumbbell lateral raise",
    categories: ["upper body", "shoulders"],
    userId: "user-id1",
  },
  {
    id: "exercise-id4",
    name: "Barbell squats",
    categories: ["lower body", "glutes", "quads"],
    userId: "user-id1",
  },
  {
    id: "exercise-id5",
    name: "Barbell deadlifts",
    categories: ["lower body", "glutes", "hamstrings", "lower back"],
    userId: "user-id1",
  },
  {
    id: "exercise-id6",
    name: "Pulldowns",
    categories: ["upper body", "back"],
    userId: "user-id1",
  },
  {
    id: "exercise-id7",
    name: "Abs candles",
    categories: ["upper body", "abs"],
    userId: "user-id1",
  },
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

const series1: Series = { id: "series-id1", reps: 10, weight: 30 };
const series2: Series = { id: "series-id2", reps: 10, weight: 35 };
const series3: Series = { id: "series-id3", reps: 14, weight: 35 };
const series4: Series = { id: "series-id4", reps: 12, weight: 50 };
const series5: Series = { id: "series-id5", reps: 12, weight: 40 };
const series6: Series = { id: "series-id6", reps: 11, weight: 30 };
const series7: Series = { id: "series-id7", reps: 9, weight: 30 };
const series8: Series = { id: "series-id8", reps: 9, weight: 60 };
const series9: Series = { id: "series-id9", reps: 8, weight: 60 };

const date1 = new Date(2024, 4, 21).toString();
const date2 = new Date(2024, 4, 1).toString();
const date3 = new Date(2024, 4, 14).toString();

export const generateRandomString = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopq654kgdkfg545l4ktrklglrt454554l54krfkl454rstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

export const workouts: Workout[] = [
  {
    id: "workout-id1",
    creationDate: new Date().toString(),
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

export const users: User[] = [
  {
    id: "user-id1",
    username: "Alex",
    password: passwords[0],
    routines: routines,
    workoutSessions: workouts,
    exercises: exercises,
  },
  {
    id: "user-id2",
    username: "Florian",
    password: passwords[1],
    routines: [],
    workoutSessions: [],
    exercises: [],
  },
];
