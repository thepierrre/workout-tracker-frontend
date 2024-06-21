import axiosInstance from "../../util/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Routine } from "../../interfaces/routine.interface";

export interface RoutinesState {
  routines: Routine[];
  loading: boolean;
  error: string | null;
}

const initialState: RoutinesState = {
  routines: [],
  loading: false,
  error: null,
};

export const fetchRoutines = createAsyncThunk<
  Routine[], // Return type of the fulfilled action
  void, // Argument type (not needed here, so void)
  { rejectValue: string } // Type of the reject value
>("routines/fetchRoutines", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("user-routines");
    return response.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const addRoutine = createAsyncThunk<
  Routine, // Return type of the fulfilled action
  Omit<Routine, "id">, // Argument type (without id)
  { rejectValue: string } // Type of the reject value
>("routines/addRoutine", async (newRoutine, thunkAPI) => {
  try {
    const response = await axiosInstance.post("routines", newRoutine);
    return response.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const updateRoutine = createAsyncThunk<
  Routine, // Return type of the fulfilled action
  Routine, // Argument type (without id)
  { rejectValue: string } // Type of the reject value
>("routines/updateRoutine", async (updatedRoutine, thunkAPI) => {
  try {
    const response = await axiosInstance.put(
      `routines/${updatedRoutine.id}`,
      updatedRoutine
    );
    return response.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const removeRoutine = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("routines/removeRoutine", async (routineId, thunkAPI) => {
  try {
    await axiosInstance.delete(`routines/${routineId}`);
    return routineId;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

const routinesSlice = createSlice({
  name: "routinesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRoutines.fulfilled,
        (state, action: PayloadAction<Routine[]>) => {
          state.loading = false;
          state.routines = action.payload;
        }
      )
      .addCase(
        fetchRoutines.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch routines.";
        }
      )
      .addCase(
        addRoutine.fulfilled,
        (state, action: PayloadAction<Routine>) => {
          state.routines.push(action.payload);
        }
      )
      .addCase(
        addRoutine.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to add the routine.";
        }
      )
      .addCase(
        removeRoutine.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.routines = state.routines.filter(
            (routine) => routine.id !== action.payload
          );
        }
      )
      .addCase(
        removeRoutine.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to remove the routine.";
        }
      )
      .addCase(
        updateRoutine.fulfilled,
        (state, action: PayloadAction<Routine>) => {
          const index = state.routines.findIndex(
            (routine) => routine.id === action.payload.id
          );
          if (index !== -1) {
            state.routines[index] = action.payload;
          }
        }
      )
      .addCase(
        updateRoutine.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Failed to update the exercise.";
        }
      );
  },
});

export default routinesSlice.reducer;
