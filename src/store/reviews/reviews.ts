import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Reviews } from '../../types/review';
import { fetchReviewsAction } from '../api-actions';

export type DataReviews = {
  reviews: Reviews;
};

const initialState: DataReviews = {
  reviews: []
};

export const dataReviews = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});
