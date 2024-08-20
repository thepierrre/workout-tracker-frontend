import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    message: "",
    visible: false,
  },
  reducers: {
    displayAlert: (state, action) => {
      state.message = action.payload;
      state.visible = true;
    },
    clearAlert: (state) => {
      state.message = "";
      state.visible = false;
    },
  },
});

export const { displayAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
