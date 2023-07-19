import { createSlice } from "@reduxjs/toolkit";

const securityGroupsSlice = createSlice({
  name: "securityGroups",
  initialState: {
    groups: [],
  },
  reducers: {
    getSecurityGroupsSuccess: (state, action) => {
      state.groups = action.payload;
    },
    // Add Security Groups
    addSecurityGroupsSuccess: (state, action) => {
      state.groups = [action.payload, ...state.groups];
    },
    // Edit Booking
    updateSecurityGroupsSuccess: (state, action) => {
      const updatedGroup = action.payload;
      const groupCode = state.groups.findIndex(
        (security) => security.groupCode === action.payload.groupCode
      );
      if (groupCode !== -1) {
        state.groups[groupCode] = updatedGroup;
      }
    },
    deleteSecurityGroupSuccess: (state, action) => {
      const groupCode = action.payload;
      state.groups = state.groups.filter(
        (group) => group.groupCode !== groupCode
      );
    },
  },
});

export const {
  getSecurityGroupsSuccess,
  addSecurityGroupsSuccess,
  updateSecurityGroupsSuccess,
  deleteSecurityGroupSuccess,
} = securityGroupsSlice.actions;

export default securityGroupsSlice.reducer;
