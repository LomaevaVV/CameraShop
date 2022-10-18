import { createSelector } from 'reselect';
import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';
import { Reviews } from '../../types/review';
import { State } from '../../types/state';
import { getReviews } from '../reviews/selectors';

export const getModalState = (state: State): string => state[NameSpace.App].ModalState;
export const getSelectedCamera = (state: State): Camera | undefined => state[NameSpace.App].selectedCameraId;
export const getReviewsAmount = (state: State): number => state[NameSpace.App].reviewsAmount;

export const getReviewsOnPage = createSelector(
  [getReviewsAmount, getReviews],
  (reviewsAmount: number, reviews: Reviews | []) => reviews.slice(0, reviewsAmount)
);
