import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { User } from "../../interfaces/user.interface";
import axiosInstance from "../../util/axiosInstance.ts";

export interface authenticatedUserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  loggedOut: boolean;
}

const initialState: authenticatedUserState = {
  user: null,
  loading: false,
  error: null,
  loggedOut: false,
};

export const initializeUser = createAsyncThunk<
  User | null,
  void,
  { rejectValue: string }
>("user/initializeUser", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("users/me");
    return response.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

const authenticatedUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    setLoggedOut: (state, action) => {
      state.loggedOut = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        initializeUser.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.loading = false;
          state.user = action.payload || null;
        },
      )
      .addCase(
        initializeUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to initialize user";
        },
      );
  },
});

export const { setUser, clearUser, setLoggedOut } =
  authenticatedUserSlice.actions;
export default authenticatedUserSlice.reducer;
