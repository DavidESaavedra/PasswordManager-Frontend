import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { ID: null, accessToken: null },
  reducers: {
    setCredentials: (state, action) => {
      const { ID, accessToken } = action.payload;
      state.ID = ID;
      state.accessToken = accessToken;
    },
    logOut: (state) => {
      state.ID = null;
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.ID;
export const selectCurrentToken = (state) => state.auth.accessToken;
