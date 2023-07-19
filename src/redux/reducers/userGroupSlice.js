import { createSlice } from "@reduxjs/toolkit";

const userGroupsSlice = createSlice({
  name: "userGroups",
  initialState: {
    groups: [],
  },
  reducers: {
    getUserGroupsSuccess: (state, action) => {
      state.groups = action.payload;
    },
    // Add User Groups
    addUserGroupsSuccess: (state, action) => {
      state.groups = [action.payload, ...state.groups];
    },
    // Edit Booking
    updateUserGroupsSuccess: (state, action) => {
      const updatedGroup = action.payload;
      const userGroupID = state.groups.findIndex(
        (User) => User.userGroupID === action.payload.userGroupID
      );
      if (userGroupID !== -1) {
        state.groups[userGroupID] = updatedGroup;
      }
    },
    deleteUserGroupSuccess: (state, action) => {
      const userGroupID = action.payload;
      state.groups = state.groups.filter(
        (group) => group.userGroupID !== userGroupID
      );
    },
  },
});

export const {
  getUserGroupsSuccess,
  addUserGroupsSuccess,
  updateUserGroupsSuccess,
  deleteUserGroupSuccess,
} = userGroupsSlice.actions;

export default userGroupsSlice.reducer;
