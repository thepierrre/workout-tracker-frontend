import { WorkingSet } from "./workingSet.interface";

export interface ExerciseInstance {
  id: string;
  exerciseTypeName: string;
  workingSets: WorkingSet[];
  notes?: string;
}
