import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Category } from "../../interfaces/category.interface";
import { categories } from "../../util/DUMMY_DATA";

export interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories,
};

const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<Category>) {},
    editCategory(state, action: PayloadAction<Category>) {},
    removeCategory(state, action: PayloadAction<Category>) {},
  },
});

export const { addCategory, editCategory, removeCategory } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
