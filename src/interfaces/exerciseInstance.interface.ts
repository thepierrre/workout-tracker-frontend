import { Series } from "./series.interface";

export interface ExerciseInstance {
  name: string;
  categories: string[];
  series: Series[];
}
