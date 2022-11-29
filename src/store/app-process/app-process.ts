import { createSlice } from '@reduxjs/toolkit';
import { ModalState, MORE_REVIEWS_STEP, NameSpace } from '../../const';
import { Camera } from '../../types/camera';
import { Reviews } from '../../types/review';

export type AppProcess = {
  modalState: string;
  selectedCameraId: Camera | undefined;
  reviewsAmount: number;
  reviewsOnPage: Reviews;
  sortType: string | null;
  sortOrder: string | null;
};

const initialState: AppProcess = {
  modalState: ModalState.Closed,
  selectedCameraId: undefined,
  reviewsAmount: MORE_REVIEWS_STEP,
  reviewsOnPage: [],
  sortType: null,
  sortOrder: null,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeModalState: (state, action: {payload: string}) => {
      state.modalState = action.payload;
    },
    setSelectedCamera: (state, action: {payload: Camera | undefined}) => {
      state.selectedCameraId = action.payload;
    },
    setReviewsAmount: (state, action: {payload: number}) => {
      state.reviewsAmount = action.payload;
    },
    setSortType: (state, action: {payload: string}) => {
      state.sortType = action.payload;
    },
    setSortOrder: (state, action: {payload: string}) => {
      state.sortOrder = action.payload;
    }
  }
});

export const {changeModalState, setSelectedCamera, setReviewsAmount, setSortType, setSortOrder} = appProcess.actions;
