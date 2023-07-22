import { createSlice } from "@reduxjs/toolkit";

const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    roles: [],
  },
  reducers: {
    getRolesSuccess: (state, action) => {
      state.roles = action.payload;
    },

    addRolesSuccess: (state, action) => {
      state.roles = [action.payload, ...state.roles];
    },

    updateRolesSuccess: (state, action) => {
      const updatedRole = action.payload;
      const roleName = state.roles.findIndex(
        (role) => role.roleName === action.payload.roleName
      );
      if (roleName !== -1) {
        state.roles[roleName] = updatedRole;
      }
    },
    deleteRoleSuccess: (state, action) => {
      const roleName = action.payload;
      state.roles = state.roles.filter((role) => role.roleName !== roleName);
    },
  },
});

export const {
  getRolesSuccess,
  addRolesSuccess,
  updateRolesSuccess,
  deleteRoleSuccess,
} = rolesSlice.actions;

export default rolesSlice.reducer;
