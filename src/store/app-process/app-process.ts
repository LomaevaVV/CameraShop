import { createSlice } from '@reduxjs/toolkit';
import { ModalState, MORE_REVIEWS_STEP, NameSpace } from '../../const';
import { Camera } from '../../types/camera';
import { Reviews } from '../../types/review';

type AppProcess = {
  ModalState: string;
  selectedCameraId: Camera | undefined;
  reviewsAmount: number;
  reviewsOnPage: Reviews;
};

const initialState: AppProcess = {
  ModalState: ModalState.Closed,
  selectedCameraId: undefined,
  reviewsAmount: MORE_REVIEWS_STEP,
  reviewsOnPage: [],
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeModalState: (state, action: {payload: string}) => {
      state.ModalState = action.payload;
    },
    setSelectedCamera: (state, action: {payload: Camera | undefined}) => {
      state.selectedCameraId = action.payload;
    },
    setReviewsAmount: (state, action: {payload: number}) => {
      state.reviewsAmount = action.payload;
    }
  }
});

export const {changeModalState, setSelectedCamera, setReviewsAmount} = appProcess.actions;
