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
    refreshSecurityGroupsOrder: (state, action) => {
      state.groups = [...state.groups, action.payload];
    },
    // Add Security Groups
    addSecurityGroupsSuccess: (state, action) => {
      state.groups = [action.payload, ...state.groups];
    },
    // Edit Booking
    updateSecurityGroupsSuccess: (state, action) => {
      state.groups[
        state.groups.findIndex(
          (security) => security.groupId === action.payload.groupId
        )
      ] = action.payload.security;
    },
  },
});

export const {
  getSecurityGroupsSuccess,
  refreshSecurityGroupsOrder,
  addSecurityGroupsSuccess,
  updateSecurityGroupsSuccess,
} = securityGroupsSlice.actions;

export default securityGroupsSlice.reducer;
