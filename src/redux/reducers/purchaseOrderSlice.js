import { createSlice } from "@reduxjs/toolkit";

const purchaseOrderSlice = createSlice({
  name: "purchase",
  initialState: {
    orders: [],
  },
  reducers: {
    getPurchaseOrderSuccess: (state, action) => {
      state.orders = action.payload;
    },

    deletePurchaseOrderSuccess: (state, action) => {
      const orderNumber = action.payload;
      state.orders = state.orders.filter(
        (order) => order.orderNumber !== orderNumber
      );
    },
    
  },
});

export const { getPurchaseOrderSuccess, deletePurchaseOrderSuccess } =
  purchaseOrderSlice.actions;

export default purchaseOrderSlice.reducer;
