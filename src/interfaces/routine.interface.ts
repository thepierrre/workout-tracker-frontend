import { Exercise } from "./exercise.interface";

export interface Routine {
  id: string;
  name: string;
  exerciseTypes: Exercise[];
  userId: string;
}
