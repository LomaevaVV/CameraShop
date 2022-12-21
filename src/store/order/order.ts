import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { postOrder } from '../api-actions';

export type DataOrder = {
  orderPostStatus: string;
};

const initialState: DataOrder = {
  orderPostStatus: FetchStatus.Idle,
};

export const dataOrder = createSlice({
  name: NameSpace.Order,
  initialState,
  reducers: {
    setOrderPostStatus: (state, action: {payload: string}) => {
      state.orderPostStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postOrder.fulfilled, (state) => {
        state.orderPostStatus = FetchStatus.Success;
      })
      .addCase(postOrder.pending, (state) => {
        state.orderPostStatus = FetchStatus.Loading;
      })
      .addCase(postOrder.rejected, (state) => {
        state.orderPostStatus = FetchStatus.Rejected;
      });
  }
});

export const {setOrderPostStatus} = dataOrder.actions;
