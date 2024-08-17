import { Category } from "./category.interface";
import { WorkingSet } from "./workingSet.interface";

export interface Exercise {
  id?: string;
  temporaryId?: string;
  name: string;
  categories: Category[];
  equipment: string;
  isDefault?: boolean;
  userId?: string;
  exerciseOrder?: number;
  workingSets?: WorkingSet[];
}
