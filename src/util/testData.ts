import { User } from "interfaces/user.interface";
import { Routine } from "interfaces/routine.interface";
import { Workout } from "interfaces/workout.interface";
import { Exercise } from "interfaces/exercise.interface";
import { Category } from "interfaces/category.interface";

export const mockUser: User = {
  id: "1",
  username: "testuser",
  password: "abc",
  routines: [],
  workoutSessions: [],
  exercises: [],
  email: "test@example.com",
};

export const mockCategories: Category[] = [
  { id: "1", name: "category1" },
  { id: "2", name: "category2" },
  { id: "3", name: "category3" },
  { id: "4", name: "category4" },
  { id: "5", name: "category5" },
  { id: "6", name: "category6" },
];

export const mockExerciseTypes: Exercise[] = [
  {
    id: "1",
    name: "exercise1",
    categories: [mockCategories[5], mockCategories[1]],
    userId: "1",
  },
  {
    id: "2",
    name: "exercise2",
    categories: [mockCategories[5], mockCategories[1], mockCategories[4]],
    userId: "1",
  },
  {
    id: "3",
    name: "exercise3",
    categories: [mockCategories[6], mockCategories[3], mockCategories[4]],
    userId: "1",
  },
  {
    id: "4",
    name: "exercise4",
    categories: [mockCategories[4], mockCategories[5], mockCategories[6]],
    userId: "1",
  },
  { id: "5", name: "exercise5", categories: [mockCategories[1]], userId: "1" },
];

export const mockRoutines: Routine[] = [
  {
    id: "1",
    name: "routine1",
    exerciseTypes: [],
    userId: "1",
  },
  {
    id: "2",
    name: "routine2",
    exerciseTypes: [mockExerciseTypes[1]],
    userId: "1",
  },
  {
    id: "3",
    name: "routine3",
    exerciseTypes: [mockExerciseTypes[2]],
    userId: "1",
  },
  {
    id: "4",
    name: "routine4",
    exerciseTypes: [mockExerciseTypes[3], mockExerciseTypes[4]],
    userId: "1",
  },
  {
    id: "5",
    name: "routine5",
    exerciseTypes: [
      mockExerciseTypes[4],
      mockExerciseTypes[5],
      mockExerciseTypes[3],
    ],
    userId: "1",
  },
  {
    id: "6",
    name: "routine5",
    exerciseTypes: [mockExerciseTypes[5]],
    userId: "1",
  },
];

export const mockWorkouts: Workout[] = [
  {
    id: "1",
    creationDate: "2024-03-30",
    exerciseInstances: [],
    routineName: "routine1",
  },
  {
    id: "2",
    creationDate: "2024-02-25",
    exerciseInstances: [],
    routineName: "routine1",
  },
  {
    id: "3",
    creationDate: "2024-03-15",
    exerciseInstances: [],
    routineName: "routine1",
  },
  {
    id: "4",
    creationDate: "2023-12-16",
    exerciseInstances: [],
    routineName: "routine1",
  },
];
