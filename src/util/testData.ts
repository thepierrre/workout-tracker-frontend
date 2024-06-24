import { User } from "interfaces/user.interface";
import { Routine } from "interfaces/routine.interface";
import { Workout } from "interfaces/workout.interface";
import { Exercise } from "interfaces/exercise.interface";

export const mockUser: User = {
  id: "1",
  username: "testuser",
  password: "abc",
  routines: [],
  workoutSessions: [],
  exercises: [],
  email: "test@example.com",
};

export const mockRoutines: Routine[] = [
  { id: "1", name: "routine1", exerciseTypes: [], userId: "1" },
  { id: "2", name: "routine2", exerciseTypes: [], userId: "1" },
  { id: "3", name: "routine3", exerciseTypes: [], userId: "2" },
  { id: "4", name: "routine4", exerciseTypes: [], userId: "2" },
  { id: "5", name: "routine5", exerciseTypes: [], userId: "2" },
  { id: "6", name: "routine5", exerciseTypes: [], userId: "2" },
];

export const mockExerciseTypes: Exercise[] = [
  { id: "1", name: "exercise1", categories: [], userId: "1" },
  { id: "2", name: "exercise2", categories: [], userId: "1" },
  { id: "3", name: "exercise3", categories: [], userId: "2" },
  { id: "4", name: "exercise4", categories: [], userId: "2" },
  { id: "5", name: "exercise5", categories: [], userId: "2" },
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
