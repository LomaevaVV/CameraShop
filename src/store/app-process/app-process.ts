import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';

type AppProcess = {
  isModalActive: boolean;
  selectedCameraId: Camera | undefined;
};

const initialState: AppProcess = {
  isModalActive: false,
  selectedCameraId: undefined
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeModalActive: (state, action: {payload: boolean}) => {
      state.isModalActive = action.payload;
    },
    setSelectedCamera: (state, action: {payload: Camera | undefined}) => {
      state.selectedCameraId = action.payload;
    }
  }
});

export const {changeModalActive, setSelectedCamera} = appProcess.actions;
