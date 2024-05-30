import { Exercise } from "../interfaces/exercise.interface";
import { Routine } from "../interfaces/routine.interface";
import { Workout } from "../interfaces/workout.interface";
import { Series } from "../interfaces/series.interface";
import { User } from "../interfaces/user.interface";
import { Category } from "../interfaces/category.interface";
import { passwords } from "./DUMY_PASSWORDS";

export const categories: Category[] = [
  { id: "category-id1", name: "chest" },
  { id: "category-id2", name: "triceps" },
  { id: "category-id3", name: "biceps" },
  { id: "category-id4", name: "back" },
  { id: "category-id5", name: "traps" },
  { id: "category-id6", name: "lats" },
  { id: "category-id7", name: "shoulders" },
  { id: "category-id8", name: "abs" },
  { id: "category-id9", name: "quads" },
  { id: "category-id10", name: "hamstrings" },
  { id: "category-id11", name: "glutes" },
  { id: "category-id12", name: "calves" },
];

export const exercises: Exercise[] = [
  {
    id: "exercise-id1",
    name: "Barbell bench press",
    categories: [categories[0], categories[2]],
    userId: "user-id1",
  },
  {
    id: "exercise-id2",
    name: "Barbell rows",
    categories: [categories[0], categories[6]],
    userId: "user-id1",
  },
  {
    id: "exercise-id3",
    name: "Dumbbell lateral raise",
    categories: [categories[0], categories[8]],
    userId: "user-id1",
  },
  {
    id: "exercise-id4",
    name: "Barbell squats",
    categories: [categories[0], categories[8]],
    userId: "user-id1",
  },
  {
    id: "exercise-id5",
    name: "Barbell deadlifts",
    categories: [categories[1], categories[4], categories[5]],
    userId: "user-id1",
  },
  {
    id: "exercise-id6",
    name: "Pulldowns",
    categories: [categories[0], categories[6]],
    userId: "user-id1",
  },
  {
    id: "exercise-id7",
    name: "Abs candles",
    categories: [categories[0], categories[3]],
    userId: "user-id1",
  },
];

export const routines: Routine[] = [
  {
    id: "routine-id1",
    name: "Full Body 1",
    exerciseTypes: [exercises[0], exercises[1], exercises[2]],
    userId: "user-id1",
  },
  {
    id: "routine-id2",
    name: "Abs",
    exerciseTypes: [exercises[3], exercises[4], exercises[5], exercises[6]],
    userId: "user-id1",
  },
  {
    id: "routine-id3",
    name: "Legs",
    exerciseTypes: [exercises[3], exercises[4], exercises[5], exercises[6]],
    userId: "user-id1",
  },
  {
    id: "routine-id4",
    name: "Upper Body",
    exerciseTypes: [exercises[3], exercises[4], exercises[5], exercises[6]],
    userId: "user-id1",
  },
  {
    id: "routine-id5",
    name: "Full Body 2",
    exerciseTypes: [exercises[3], exercises[4], exercises[5], exercises[6]],
    userId: "user-id1",
  },
  {
    id: "routine-id6",
    name: "Cardio",
    exerciseTypes: [exercises[3], exercises[4], exercises[5], exercises[6]],
    userId: "user-id1",
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

const date1 = new Date(2022, 4, 21).toString();
const date2 = new Date(2022, 5, 1).toString();
const date3 = new Date(2023, 4, 15).toString();
const date4 = new Date(2024, 0, 15).toString();
const date5 = new Date(2024, 4, 3).toString();
const date6 = new Date(2024, 4, 11).toString();
const date7 = new Date(2023, 4, 14).toString();
const date8 = new Date(2021, 4, 21).toString();
const date9 = new Date(2024, 1, 14).toString();
const date10 = new Date(2023, 7, 14).toString();
const date11 = new Date(2024, 4, 15).toString();
const date12 = new Date(2024, 4, 15).toString();

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
    routineName: "Legs",
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
  {
    id: "workout-id4",
    creationDate: date4,
    routineName: "Abs",
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
  {
    id: "workout-id5",
    creationDate: date5,
    routineName: "Abs",
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
  {
    id: "workout-id6",
    creationDate: date6,
    routineName: "Cardio",
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
  {
    id: "workout-id7",
    creationDate: date7,
    routineName: "Pulling 1",
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
  {
    id: "workout-id8",
    creationDate: date8,
    routineName: "Pulling 2",
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
  {
    id: "workout-id9",
    creationDate: date9,
    routineName: "Pushing",
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
  {
    id: "workout-id10",
    creationDate: date10,
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
  {
    id: "workout-id11",
    creationDate: date11,
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
  {
    id: "workout-id12",
    creationDate: date12,
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
    username: "Piotr",
    password: passwords[0],
    email: "piotr@example.com",
    routines: routines,
    workoutSessions: workouts,
    exercises: exercises,
  },
  {
    id: "user-id2",
    username: "Florian",
    password: passwords[1],
    email: "florian@example.com",
    routines: [],
    workoutSessions: [],
    exercises: [],
  },
];
