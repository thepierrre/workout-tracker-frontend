import { Exercise } from "./exercise.interface";

export interface Routine {
  id: string | undefined;
  name: string;
  exercises: Exercise[];
}
