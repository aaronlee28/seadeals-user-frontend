import { createSlice } from '@reduxjs/toolkit';

interface CartInitialState {
  recentCartItems: any[],
  checkedIDs: number[],
  total: number,
}

const initialState:CartInitialState = {
  recentCartItems: [],
  checkedIDs: [],
  total: 0,
  // isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, { payload }) => {
      if (state.recentCartItems.find(
        (item) => item.cartItemID === payload.cartItemID,
      )) return { ...state };
      let newCartItems = [payload, ...state.recentCartItems];
      if (newCartItems.length > 5) { newCartItems = newCartItems.slice(0, -1); }
      return { ...state, recentCartItems: newCartItems, total: state.total + 1 };
    },
    removeCartItem: (state, { payload }) => {
      const newCartItems = state.recentCartItems.filter(
        (item) => item.cartItemID !== payload,
      );
      let total = state.total - 1;
      if (total < 0) { total = 0; }
      return { ...state, recentCartItems: newCartItems, total };
    },
    checkCartItem: (state, { payload }) => {
      const checkedIDs = [...state.checkedIDs, payload];
      return { ...state, checkedIDs };
    },
    uncheckCartItem: (state, { payload }) => {
      const checkedIDs = state.checkedIDs.filter((item) => item !== payload);
      return { ...state, checkedIDs };
    },
    checkCartBuyNow: (state, { payload }) => {
      const checkedIDs = [payload];
      return { ...state, checkedIDs };
    },
    clearChecked: (state) => ({ ...state, checkedIDs: [] }),
  },
  extraReducers: {

  },
});

export const {
  addCartItem, removeCartItem, checkCartItem,
  uncheckCartItem, checkCartBuyNow, clearChecked,
} = cartSlice.actions;

export default cartSlice.reducer;
