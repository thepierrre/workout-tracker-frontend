import { Exercise } from "./exercise.interface";

export interface Routine {
  id: string;
  name: string;
  routineExercises?: Exercise[];
  userId: string;
}
