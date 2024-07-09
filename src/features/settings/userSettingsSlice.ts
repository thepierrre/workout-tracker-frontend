import axiosInstance from "../../util/axiosInstance";
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserSettings } from "interfaces/userSettings.interface";

export interface UserSettingsState {
  userSettings: UserSettings | undefined;
  loading: boolean;
  error: string | null;
}

const initialState: UserSettingsState = {
  userSettings: undefined,
  loading: false,
  error: null,
};

export const fetchUserSettings = createAsyncThunk<
  UserSettings,
  void,
  { rejectValue: string }
>("user/fetchUserSettings", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`users/user-settings`);
    return response.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

const userSettingsSlice = createSlice({
  name: "userSettingsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserSettings.fulfilled,
        (state, action: PayloadAction<UserSettings>) => {
          state.loading = false;
          state.userSettings = action.payload;
        }
      )
      .addCase(
        fetchUserSettings.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch routines.";
        }
      );
  },
});

export default userSettingsSlice.reducer;
