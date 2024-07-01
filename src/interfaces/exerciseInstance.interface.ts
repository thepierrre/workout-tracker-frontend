import { workingSet } from "./workingSet.interface";

export interface ExerciseInstance {
  id: string;
  exerciseTypeName: string;
  workingSets: workingSet[];
}
