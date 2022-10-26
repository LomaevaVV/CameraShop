import { FetchStatus, MAX_CARDS_ON_PAGE } from '../../const';
import { makeFakeCamera, FAKE_CAMERAS_AMOUNT } from '../../tests/mocks';

import { fetchProductAction, fetchCamerasAction, fetchSimilarAction } from '../api-actions';
import { dataCameras, DataCameras } from './cameras';
import { Camera, Cameras } from '../../types/camera';

const fakeCameras: Cameras = [];

for (let i = 0; i < MAX_CARDS_ON_PAGE; i++) {
  fakeCameras.push(makeFakeCamera());
}

const fakeCamera: Camera = makeFakeCamera();

describe('Reducer: cameras', () => {
  let state: DataCameras;

  beforeEach(() => {
    state = {
      cameras: [],
      camerasFetchStatus: FetchStatus.Idle,
      camerasTotalCount: 0,
      product: undefined,
      productFetchStatus: FetchStatus.Idle,
      similar: [],
    };
  });


  it('without additional parameters should return initial state', () => {
    expect(dataCameras.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('fetchCamerasAction test', () => {

    it('should update camerasFetchStatus by loading cameras', () => {
      expect(dataCameras.reducer(state, { type: fetchCamerasAction.pending.type }))
        .toEqual({
          cameras: [],
          camerasFetchStatus: FetchStatus.Loading,
          camerasTotalCount: 0,
          product: undefined,
          productFetchStatus: FetchStatus.Idle,
          similar: [],
        });
    });

    it('should update cameras, camerasTotalCount and camerasFetchStatus by load cameras', () => {
      expect(dataCameras.reducer(state, { type: fetchCamerasAction.fulfilled.type, payload: { data: fakeCameras, camerasTotalCount: FAKE_CAMERAS_AMOUNT } }))
        .toEqual({
          cameras: fakeCameras,
          camerasFetchStatus: FetchStatus.Success,
          camerasTotalCount: FAKE_CAMERAS_AMOUNT,
          product: undefined,
          productFetchStatus: FetchStatus.Idle,
          similar: [],
        });
    });

    it('should update camerasFetchStatus by fetchCamerasAction rejected', () => {
      expect(dataCameras.reducer(state, { type: fetchCamerasAction.rejected.type }))
        .toEqual({
          cameras: [],
          camerasFetchStatus: FetchStatus.Rejected,
          camerasTotalCount: 0,
          product: undefined,
          productFetchStatus: FetchStatus.Idle,
          similar: [],
        });
    });
  });

  describe('fetchProductAction test', () => {

    it('should update productFetchStatus by loading product', () => {
      expect(dataCameras.reducer(state, { type: fetchProductAction.pending.type }))
        .toEqual({
          cameras: [],
          camerasFetchStatus: FetchStatus.Idle,
          camerasTotalCount: 0,
          product: undefined,
          productFetchStatus: FetchStatus.Loading,
          similar: [],
        });
    });

    it('should update product and productFetchStatus by load product', () => {
      expect(dataCameras.reducer(state, { type: fetchProductAction.fulfilled.type, payload: fakeCamera }))
        .toEqual({
          cameras: [],
          camerasFetchStatus: FetchStatus.Idle,
          camerasTotalCount: 0,
          product: fakeCamera,
          productFetchStatus: FetchStatus.Success,
          similar: [],
        });
    });


    it('should update productFetchStatus by fetchProductAction rejected', () => {
      expect(dataCameras.reducer(state, { type: fetchProductAction.rejected.type }))
        .toEqual({
          cameras: [],
          camerasFetchStatus: FetchStatus.Idle,
          camerasTotalCount: 0,
          product: undefined,
          productFetchStatus: FetchStatus.Rejected,
          similar: [],
        });
    });
  });

  describe('fetchSimilarAction test', () => {
    it('should update similar by load similar cameras', () => {
      expect(dataCameras.reducer(state, { type: fetchSimilarAction.fulfilled.type, payload: fakeCameras }))
        .toEqual({
          cameras: [],
          camerasFetchStatus: FetchStatus.Idle,
          camerasTotalCount: 0,
          product: undefined,
          productFetchStatus: FetchStatus.Idle,
          similar: fakeCameras,
        });
    });
  });
});

