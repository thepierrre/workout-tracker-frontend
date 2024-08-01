import { WorkingSet } from "./workingSet.interface";

export interface RoutineExercise {
  id: string;
  name: string;
  workingSets: WorkingSet[];
  userId?: string;
}
