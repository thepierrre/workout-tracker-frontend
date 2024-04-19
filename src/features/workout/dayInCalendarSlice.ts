import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DayInCalendarState {
  day: string;
}

const initialState: DayInCalendarState = {
  day: new Date().toDateString(),
};

const dayInCalendarSlice = createSlice({
  name: "chosenDay",
  initialState,
  reducers: {
    setDay(state, action: PayloadAction<string>) {
      const dayToSet = action.payload;
      state.day = dayToSet;
    },
  },
});

export const { setDay } = dayInCalendarSlice.actions;
export default dayInCalendarSlice.reducer;
