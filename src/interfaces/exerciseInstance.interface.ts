import { Series } from "./series.interface";
import { Exercise } from "./exercise.interface";

export interface ExerciseInstance {
  exercise: Exercise;
  //   categories: string[];
  series: Series[];
}
