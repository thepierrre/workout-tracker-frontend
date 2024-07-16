import axios from "axios";
import axiosInstance from "../../util/axiosInstance.ts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces/user.interface";

export interface authenticatedUserState {
  user: User | undefined;
  loading: boolean;
  error: string | null;
}

const initialState: authenticatedUserState = {
  user: undefined,
  loading: false,
  error: null,
};

export const initializeUser = createAsyncThunk<
  User | undefined,
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
    setUser(state, action: PayloadAction<User | undefined>) {
      state.user = action.payload;
      console.log(state.user);
    },
    clearUser(state) {
      state.user = undefined;
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
        (state, action: PayloadAction<User | undefined>) => {
          state.loading = false;
          state.user = action.payload || undefined;
        }
      )
      .addCase(
        initializeUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to initialize user";
        }
      );
  },
});

export const { setUser, clearUser } = authenticatedUserSlice.actions;
export default authenticatedUserSlice.reducer;
