import { OrdersPageState } from "../../../lib/types/screen";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: OrdersPageState = {
  pausedOrders: [],
  processOrders: [],
  finishedOrders: [],
};

const ordersPageSlice = createSlice({
  name: "ordersPage",
  initialState,
  reducers: {
    setPausedOrders: (state, action: PayloadAction<any[]>) => {
      state.pausedOrders = action.payload;
    },
    setProcessOrders: (state, action: PayloadAction<any[]>) => {
      state.processOrders = action.payload;
    },
    setFinishedOrders: (state, action: PayloadAction<any[]>) => {
      state.finishedOrders = action.payload;
    },
  },
});

export const { setPausedOrders, setProcessOrders, setFinishedOrders } =
  ordersPageSlice.actions;
const OrdersPageReducer = ordersPageSlice.reducer;
export default OrdersPageReducer;