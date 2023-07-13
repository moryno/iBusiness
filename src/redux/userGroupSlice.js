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
    refreshUserGroupsOrder: (state, action) => {
      const existingGroupCodes = state.groups.map((group) => group.groupCode);
      const updatedGroups = action.payload.filter(
        (group) => !existingGroupCodes.includes(group.groupCode)
      );
      state.groups = [...state.groups, ...updatedGroups];
    },
    // Add User Groups
    addUserGroupsSuccess: (state, action) => {
      state.groups = [action.payload, ...state.groups];
    },
    // Edit Booking
    updateUserGroupsSuccess: (state, action) => {
      const updatedGroup = action.payload;
      const groupCode = state.groups.findIndex(
        (User) => User.groupCode === action.payload.groupCode
      );
      if (groupCode !== -1) {
        state.groups[groupCode] = updatedGroup;
      }
    },
    deleteUserGroupSuccess: (state, action) => {
      const groupCode = action.payload;
      state.groups = state.groups.filter(
        (group) => group.groupCode !== groupCode
      );
    },
  },
});

export const {
  getUserGroupsSuccess,
  refreshUserGroupsOrder,
  addUserGroupsSuccess,
  updateUserGroupsSuccess,
} = userGroupsSlice.actions;

export default userGroupsSlice.reducer;
