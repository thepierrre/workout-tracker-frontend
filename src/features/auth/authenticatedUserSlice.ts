import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../interfaces/user.interface";
import { users } from "../../util/DUMMY_DATA";

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

export const fetchUser = createAsyncThunk<
  User, // Return type of the fulfilled action
  string, // Argument type (username or user ID)
  { rejectValue: string } // Type of the reject value
>("user/fetchUser", async (username, thunkAPI) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/users/${username}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
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
    },
    clearUser(state) {
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload; // Store the single user
      })
      .addCase(
        fetchUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch user";
        }
      );
  },
});

export const { setUser, clearUser } = authenticatedUserSlice.actions;
export default authenticatedUserSlice.reducer;
