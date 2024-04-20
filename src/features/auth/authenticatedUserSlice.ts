import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../interfaces/user.interface";
import { users } from "../../util/DUMMY_DATA";

export interface authenticatedUserState {
  authenticatedUser: User;
}

const initialState: authenticatedUserState = {
  authenticatedUser: users[0],
};

const authenticatedUserSlice = createSlice({
  name: "authenticatedUser",
  initialState,
  reducers: {
    setAuthenticatedUser(state, action: PayloadAction<User>) {
      const userToSet = action.payload;
      state.authenticatedUser = userToSet;
    },
  },
});

export const setAuthenticatedUser = authenticatedUserSlice.actions;
export default authenticatedUserSlice.reducer;
