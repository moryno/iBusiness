import { createSlice } from "@reduxjs/toolkit";
import { logoutFunc } from "../helpers/auth.js";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    users: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getUserSuccess: (state, action) => {
      state.users = action.payload;
    },
    refreshUser: (state, action) => {
      const existingUserNames = state.users.map((user) => user.userName);
      const updatedUsers = action.payload.filter(
        (user) => !existingUserNames.includes(user.userName)
      );
      state.users = [...state.users, ...updatedUsers];
    },
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      logoutFunc();
    },
    logoutUserInfo: (state) => {
      state.currentUser = null;
      localStorage.removeItem("token");
    },
    updateUserProfile: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        user: action.payload.user,
      };
    },
  },
});

export const {
  getUserSuccess,
  refreshUser,
  loginStart,
  loginSuccess,
  loginFailure,
  logoutUserInfo,
  logout,
  updateUserProfile,
} = userSlice.actions;
export default userSlice.reducer;
