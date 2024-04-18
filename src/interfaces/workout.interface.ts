import { ExerciseInstance } from "./exerciseInstance.interface";
import { Routine } from "./routine.interface";

export interface Workout {
  created: Date;
  routineName: Routine["name"];
  exercises: ExerciseInstance[];
}
