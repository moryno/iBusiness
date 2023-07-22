import { createSlice } from "@reduxjs/toolkit";

const groupRolesSlice = createSlice({
  name: "groupRoles",
  initialState: {
    groups: [],
  },
  reducers: {
    getGroupRolesSuccess: (state, action) => {
      state.groups = action.payload;
    },
    // Add User Groups
    addGroupRolesSuccess: (state, action) => {
      state.groups = [action.payload, ...state.groups];
    },

    updateGroupRolesSuccess: (state, action) => {
      const updatedGroup = action.payload;
      const groupRoleID = state.groups.findIndex(
        (group) => group.groupRoleID === action.payload.groupRoleID
      );
      if (groupRoleID !== -1) {
        state.groups[groupRoleID] = updatedGroup;
      }
    },

    deleteGroupRolesuccess: (state, action) => {
      const groupRoleID = action.payload;
      state.groups = state.groups.filter(
        (group) => group.groupRoleID !== groupRoleID
      );
    },
  },
});

export const {
  getGroupRolesSuccess,
  addGroupRolesSuccess,
  updateGroupRolesSuccess,
  deleteGroupRolesuccess,
} = groupRolesSlice.actions;

export default groupRolesSlice.reducer;
