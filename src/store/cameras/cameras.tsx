import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, FetchStatus } from '../../const';
import { Cameras } from '../../types/camera';
import { fetchCamerasAction } from '../api-actions';

type DataCameras = {
  cameras: Cameras;
  camerasFetchStatus: string;
  camerasTotalCount: number;
};

const initialState: DataCameras = {
  cameras: [],
  camerasFetchStatus: FetchStatus.Idle,
  camerasTotalCount: 0,
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
        state.cameras = action.payload.data;
        state.camerasTotalCount = Number(action.payload.camerasTotalCount);
        state.camerasFetchStatus = FetchStatus.Success;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.cameras = [];
        state.camerasFetchStatus = FetchStatus.Rejected;
      });
  }
});
