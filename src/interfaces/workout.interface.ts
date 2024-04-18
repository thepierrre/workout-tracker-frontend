import { ExerciseInstance } from "./exerciseInstance.interface";
import { Routine } from "./routine.interface";

export interface Workout {
  id: string;
  creationDate: Date;
  routineName: Routine["name"];
  exerciseInstances: ExerciseInstance[];
}
