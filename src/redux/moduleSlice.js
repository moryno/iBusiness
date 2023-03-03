import { createSlice } from "@reduxjs/toolkit";
import { moduleMenus1 } from "../helpers/mySubLinks";

const moduleSlice = createSlice({
  name: "moduleCategory",
  initialState: {
    category: moduleMenus1,
  },
  reducers: {
    getModule: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { getModule } = moduleSlice.actions;
export default moduleSlice.reducer;
