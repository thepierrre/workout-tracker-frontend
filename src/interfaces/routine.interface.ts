import { Exercise } from "./exercise.interface";
import { RoutineExercise } from "./routineExercise.interface";

export interface Routine {
  id: string;
  name: string;
  exerciseTypes?: Exercise[];
  routineExerciseTypes?: RoutineExercise[];
  userId: string;
}
