import { ModalState, MORE_REVIEWS_STEP } from '../../const';
import { makeFakeProduct } from '../../tests/mocks';
import { AppProcess, appProcess, changeModalState, setReviewsAmount, setSelectedCamera } from './app-process';
import { Camera } from '../../types/camera';

const fakeCamera: Camera = makeFakeProduct();

describe('Reducer: app-process', () => {
  let state: AppProcess;

  beforeEach(() => {
    state = {
      modalState: ModalState.Closed,
      selectedCameraId: undefined,
      reviewsAmount: MORE_REVIEWS_STEP,
      reviewsOnPage: [],
      sortType: null,
      sortOrder: null,
    };
  });


  it('without additional parameters should return initial state', () => {
    expect(appProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('changeModalState test', () => {

    it('should update ModalStates by changeModalState', () => {
      expect(appProcess.reducer(state, changeModalState(ModalState.BasketAddItem)))
        .toEqual({
          modalState: ModalState.BasketAddItem,
          selectedCameraId: undefined,
          reviewsAmount: MORE_REVIEWS_STEP,
          reviewsOnPage: [],
          sortType: null,
          sortOrder: null,
        });
    });
  });

  describe('setSelectedCamera test', () => {

    it('should update selectedCamera by setSelectedCamera', () => {
      expect(appProcess.reducer(state, setSelectedCamera(fakeCamera)))
        .toEqual({
          modalState: ModalState.Closed,
          selectedCameraId: fakeCamera,
          reviewsAmount: MORE_REVIEWS_STEP,
          reviewsOnPage: [],
          sortType: null,
          sortOrder: null,
        });
    });
  });

  describe('setReviewsAmount test', () => {
    const fakeReviewsAmount = MORE_REVIEWS_STEP + MORE_REVIEWS_STEP;

    it('should update selectedCamera by setSelectedCamera', () => {
      expect(appProcess.reducer(state, setReviewsAmount(fakeReviewsAmount)))
        .toEqual({
          modalState: ModalState.Closed,
          selectedCameraId: undefined,
          reviewsAmount: fakeReviewsAmount,
          reviewsOnPage: [],
          sortType: null,
          sortOrder: null,
        });
    });
  });
});

