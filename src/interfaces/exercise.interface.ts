import { Category } from "./category.interface";

export interface Exercise {
  id: string;
  name: string;
  categories: Category[];
  equipment: string;
  isDefault: boolean;
  userId?: string;
}
