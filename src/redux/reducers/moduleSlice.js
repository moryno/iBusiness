import { createSlice } from "@reduxjs/toolkit";

const moduleSlice = createSlice({
  name: "moduleCategory",
  initialState: {
    sideMenus: [],
    partitionKey: "",
    menuItem: ""
  },
  reducers: {
    getMenus: (state, action) => {
      state.sideMenus = action.payload;
    },
    getModule: (state, action) => {
      state.partitionKey = action.payload;
    },
    getMenuItem: (state, action) => {
      state.menuItem= action.payload;
    },
  },
});

export const { getMenus, getModule, getMenuItem } = moduleSlice.actions;
export default moduleSlice.reducer;
