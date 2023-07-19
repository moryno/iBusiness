import { createSlice } from "@reduxjs/toolkit";

const moduleSlice = createSlice({
  name: "moduleCategory",
  initialState: {
    sideMenus: [],
    partitionKey: "",
  },
  reducers: {
    getMenus: (state, action) => {
      state.sideMenus = action.payload;
    },
    getModule: (state, action) => {
      state.partitionKey = action.payload;
    },
  },
});

export const { getMenus, getModule } = moduleSlice.actions;
export default moduleSlice.reducer;
