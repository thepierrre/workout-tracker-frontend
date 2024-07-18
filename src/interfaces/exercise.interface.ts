import { Category } from "./category.interface";

export interface Exercise {
  id: string;
  name: string;
  categories: Category[];
  userId?: string;
}
