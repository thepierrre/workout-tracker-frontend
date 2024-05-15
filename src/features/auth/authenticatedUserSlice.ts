import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../interfaces/user.interface";
import { users } from "../../util/DUMMY_DATA";

export interface authenticatedUserState {
  user: User | undefined;
}

const initialState: authenticatedUserState = {
  user: users[0],
  // user: undefined,
};

const authenticatedUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | undefined>) {
      const userToSet = action.payload;
      state.user = userToSet;
    },
  },
});

export const { setUser } = authenticatedUserSlice.actions;
export default authenticatedUserSlice.reducer;
