import { Series } from "./series.interface";
import { Exercise } from "./exercise.interface";

export interface ExerciseInstance {
  id: string;
  exercise: Exercise;
  series: Series[];
}