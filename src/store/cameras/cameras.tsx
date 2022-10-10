import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, FetchStatus } from '../../const';
import { Cameras } from '../../types/camera';
import { fetchCamerasAction } from '../api-actions';

type DataCameras = {
  cameras: Cameras;
  camerasFetchStatus: string;
};

const initialState: DataCameras = {
  cameras: [],
  camerasFetchStatus: FetchStatus.Idle,
};

export const dataCameras = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.camerasFetchStatus = FetchStatus.Loading;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.camerasFetchStatus = FetchStatus.Success;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.cameras = [];
        state.camerasFetchStatus = FetchStatus.Rejected;
      });
  }
});
