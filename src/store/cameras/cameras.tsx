import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, FetchStatus, DEFAULT_CATALOG_PAGE } from '../../const';
import { Camera, Cameras, CamerasFetchParams, CamerasPriceRange } from '../../types/camera';
import { fetchCamerasAction, fetchProductAction, fetchSimilarAction, fetchCamerasBySearchAction, fetchPriceRangeAction } from '../api-actions';

export type DataCameras = {
  cameras: Cameras;
  camerasFetchStatus: string;
  camerasTotalCount: number;
  product: Camera | undefined;
  productFetchStatus: string;
  similar: Cameras;
  camerasByName: Cameras;
  priceRange: CamerasPriceRange;
  priceRangeFetchStatus: string;
  camerasFetchParams: CamerasFetchParams;
};

const initialState: DataCameras = {
  cameras: [],
  camerasFetchStatus: FetchStatus.Idle,
  camerasTotalCount: 0,
  product: undefined,
  productFetchStatus: FetchStatus.Idle,
  similar: [],
  camerasByName: [],
  priceRange: {camerasMinPrice: 0, camerasMaxPrice: 0},
  priceRangeFetchStatus: FetchStatus.Idle,
  camerasFetchParams: {
    pageId: DEFAULT_CATALOG_PAGE,
    sortType: null,
    sortOrder: null,
    minPrice: null,
    maxPrice: null,
    category: null,
    type: null,
    level: null
  }
};

export const dataCameras = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {
    setCamerasFetchParams: (state, action: {payload: CamerasFetchParams}) => {
      state.camerasFetchParams = action.payload;
    },
  },
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
      })
      .addCase(fetchPriceRangeAction.fulfilled, (state, action) => {
        state.priceRange = action.payload;
        state.priceRangeFetchStatus = FetchStatus.Success;
      });
  }
});

export const {setCamerasFetchParams} = dataCameras.actions;
