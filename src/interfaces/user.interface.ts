import { Routine } from "./routine.interface";
import { Workout } from "./workout.interface";
import { Exercise } from "./exercise.interface";

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  routines: Routine[];
  workoutSessions: Workout[];
  exercises: Exercise[];
}
