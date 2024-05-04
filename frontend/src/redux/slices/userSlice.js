import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    changeUserSuccess: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      state.loading = false;
      state.error = null;
    },
    changeUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { changeUserStart, changeUserSuccess, changeUserFailure } =
  userSlice.actions;
export default userSlice.reducer;
