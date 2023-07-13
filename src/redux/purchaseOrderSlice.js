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
    refreshPurchaseOrder: (state, action) => {
      const existingOrderNumbers = state.orders.map(
        (order) => order.orderNumber
      );
      const updatedOrders = action.payload.filter(
        (order) => !existingOrderNumbers.includes(order.orderNumber)
      );
      state.orders = [...state.orders, ...updatedOrders];
    },
  },
});

export const { getPurchaseOrderSuccess, refreshPurchaseOrder } =
  purchaseOrderSlice.actions;

export default purchaseOrderSlice.reducer;
