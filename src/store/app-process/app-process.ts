import { createSlice } from '@reduxjs/toolkit';
import { ModalState, NameSpace } from '../../const';
import { Camera } from '../../types/camera';

type AppProcess = {
  ModalState: string;
  selectedCameraId: Camera | undefined;
};

const initialState: AppProcess = {
  ModalState: ModalState.Closed,
  selectedCameraId: undefined
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
    }
  }
});

export const {changeModalState, setSelectedCamera} = appProcess.actions;
