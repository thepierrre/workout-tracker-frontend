import { Category } from "./category.interface";

export interface Exercise {
  id: string | undefined;
  name: string;
  categories: Category[];
  userId: string;
}
