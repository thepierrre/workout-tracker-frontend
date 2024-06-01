import { Series } from "./series.interface";
import { Exercise } from "./exercise.interface";

export interface ExerciseInstance {
  id: string;
  exerciseType: Exercise;
  series: Series[];
}
