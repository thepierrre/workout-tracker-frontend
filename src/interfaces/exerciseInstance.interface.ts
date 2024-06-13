import { Series } from "./series.interface";

export interface ExerciseInstance {
  id: string;
  exerciseTypeName: string;
  workingSets: Series[];
}
