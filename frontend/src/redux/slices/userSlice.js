import { compose, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  accessToken: null,
  error: null,
  success: null,
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
    authUserSuccess: (state, action) => {
      state.currentUser = {
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        avatar: action.payload.avatar,
        isAdmin: action.payload.isAdmin,
        company: action.payload.company,
      };
      state.accessToken = action.payload.accessToken;
      state.loading = false;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = {
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        avatar: action.payload.avatar,
        isAdmin: action.payload.isAdmin,
        company: action.payload.company,
      };
      state.loading = false;
      state.error = null;
    },
    changeUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.accessToken = null;
      state.success = null;
      state.loading = false;
      state.error = null;
    },
    changeAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    setSuccessMessage: (state, action) => {
      state.success = action.payload;
    },
    unsetSuccessMessage: (state) => {
      state.success = null;
    },
    setCompany: (state, action) => {
      state.currentUser.company = action.payload;
    },
  },
});

export const {
  changeUserStart,
  authUserSuccess,
  changeUserFailure,
  signoutSuccess,
  changeAccessToken,
  updateUserSuccess,
  setSuccessMessage,
  unsetSuccessMessage,
  setCompany,
} = userSlice.actions;
export default userSlice.reducer;
