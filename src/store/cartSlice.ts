import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartState = {
  count: number;
};

export type CartItemPayload = {
  quantity?: number | string;
};

const initialState: CartState = {
  count: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItemPayload>) {
      const qty = action.payload?.quantity
        ? Number(action.payload.quantity)
        : 1;

      state.count += isNaN(qty) ? 1 : qty;
    },

    resetCart(state) {
      state.count = 0;
    },
  },
});

export const { addToCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
