import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";

export interface DayInCalendarState {
  day: string;
}

const initialState: DayInCalendarState = {
  day: format(new Date(), "dd/MM/yyyy"),
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
