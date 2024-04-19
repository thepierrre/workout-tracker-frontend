import { ExerciseInstance } from "./exerciseInstance.interface";
import { Routine } from "./routine.interface";

export interface Workout {
  id: string;
  creationDate: string;
  routineName: Routine["name"];
  exerciseInstances: ExerciseInstance[];
}
