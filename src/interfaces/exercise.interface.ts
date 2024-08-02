import { Category } from "./category.interface";

export interface Exercise {
    id: string;
    name: string;
    categories: Category[];
    isDefault: boolean;
    userId?: string;
    repsOrTimed: string;
}
