import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { Category } from "interfaces/category.interface";
import { v4 as uuidv4 } from "uuid";

import { Exercise } from "../../interfaces/exercise.interface";
import { WorkingSet } from "../../interfaces/workingSet.interface";

export interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

export const localCategoriesSlice = createSlice({
  name: "localCategories",
  initialState,
  reducers: {
    fetchLocalCategories: (state) => {
      return state;
    },
    updateLocalCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { fetchLocalCategories, updateLocalCategories } =
  localCategoriesSlice.actions;
export default localCategoriesSlice.reducer;
