import { Exercise } from "./exercise.interface";

export interface Routine {
  id: string;
  name: string;
  exercises: Exercise[];
  userId: string;
}
