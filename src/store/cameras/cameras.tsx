import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, FetchStatus } from '../../const';
import { Camera, Cameras } from '../../types/camera';
import { fetchCamerasAction, fetchProductAction, fetchSimilarAction, fetchCamerasBySearchAction } from '../api-actions';

export type DataCameras = {
  cameras: Cameras;
  camerasFetchStatus: string;
  camerasTotalCount: number;
  product: Camera | undefined;
  productFetchStatus: string;
  similar: Cameras;
  camerasByName: Cameras;
};

const initialState: DataCameras = {
  cameras: [],
  camerasFetchStatus: FetchStatus.Idle,
  camerasTotalCount: 0,
  product: undefined,
  productFetchStatus: FetchStatus.Idle,
  similar: [],
  camerasByName: []
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
      })
      .addCase(fetchProductAction.pending, (state) => {
        state.productFetchStatus = FetchStatus.Loading;
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.product = action.payload;
        state.productFetchStatus = FetchStatus.Success;
      })
      .addCase(fetchProductAction.rejected, (state) => {
        state.product = undefined;
        state.productFetchStatus = FetchStatus.Rejected;
      })
      .addCase(fetchSimilarAction.fulfilled, (state, action) => {
        state.similar = action.payload;
      })
      .addCase(fetchCamerasBySearchAction.fulfilled, (state, action) => {
        state.camerasByName = action.payload;
      });
  }
});
