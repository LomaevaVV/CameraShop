import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataCameras as cameras } from './cameras/cameras';
import { dataPromo as promo } from './promo/promo';
import { dataReviews as reviews } from './reviews/reviews';
import { appProcess } from './app-process/app-process';
import { dataCoupons as coupons } from './coupons/coupons';
import { dataOrder as order } from './order/order';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: cameras.reducer,
  [NameSpace.Promo]: promo.reducer,
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.Reviews]: reviews.reducer,
  [NameSpace.Coupons]: coupons.reducer,
  [NameSpace.Order]: order.reducer
});
