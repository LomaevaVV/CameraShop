import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { postDiscountByCoupon } from '../api-actions';

export type DataCoupons = {
  coupon: string;
  discount: number;
};

const initialState: DataCoupons = {
  coupon: '',
  discount: 0,
};

export const dataCoupons = createSlice({
  name: NameSpace.Coupons,
  initialState,
  reducers: {
    setCoupon: (state, action: {payload: string}) => {
      state.coupon = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postDiscountByCoupon.fulfilled, (state, action) => {
        state.discount = action.payload;
        window.console.log(action.payload);
      });
  }
});
