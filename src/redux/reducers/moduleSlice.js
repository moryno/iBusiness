import { createSlice } from "@reduxjs/toolkit";

const moduleSlice = createSlice({
  name: "moduleCategory",
  initialState: {
    sideMenus: [],
    moduleMenus: {},
    partitionKey: "",
    moduleName: "",
    menuItem: "",
  },
  reducers: {
    getMenus: (state, action) => {
      state.sideMenus = action.payload;
    },
    getModuleMenus: (state, action) => {
      state.moduleMenus = action.payload;
    },
    getModuleName: (state, action) => {
      state.moduleName = action.payload;
    },
    getPartitionKey: (state, action) => {
      state.partitionKey = action.payload;
    },
    getMenuItem: (state, action) => {
      state.menuItem = action.payload;
    },
  },
});

export const {
  getMenus,
  getModuleMenus,
  getModuleName,
  getPartitionKey,
  getMenuItem,
} = moduleSlice.actions;
export default moduleSlice.reducer;
