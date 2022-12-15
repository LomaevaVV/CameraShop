import { createSelector } from 'reselect';
import { NameSpace } from '../../const';
import { Camera, CamerasInBasket } from '../../types/camera';
import { Reviews } from '../../types/review';
import { State } from '../../types/state';
import { getCamerasInBasket } from '../cameras/selectors';
import { getReviews } from '../reviews/selectors';

export const getModalState = (state: State): string => state[NameSpace.App].modalState;
export const getSelectedCamera = (state: State): Camera | undefined => state[NameSpace.App].selectedCameraId;
export const getReviewsAmount = (state: State): number => state[NameSpace.App].reviewsAmount;
export const getSortType = (state: State): string | null => state[NameSpace.App].sortType;
export const getSortOrder = (state: State): string | null => state[NameSpace.App].sortOrder;

export const getReviewsOnPage = createSelector(
  [getReviewsAmount, getReviews],
  (reviewsAmount: number, reviews: Reviews | []) => reviews.slice(0, reviewsAmount)
);

export const getBasketValue = createSelector(
  [getCamerasInBasket],
  (camerasInBasket: CamerasInBasket | []) => {
    let sum = 0;
    camerasInBasket.forEach((item) => (sum += item.camera.price * item.amount));
    return sum;
  }
);

export const getBasketAmount = createSelector(
  [getCamerasInBasket],
  (camerasInBasket: CamerasInBasket | []) => {
    let amount = 0;
    camerasInBasket.forEach((item) => (amount += item.amount));
    return amount;
  }
);
