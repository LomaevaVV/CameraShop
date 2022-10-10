import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataCameras as cameras } from './cameras/cameras';
import { dataPromo as promo } from './promo/promo';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: cameras.reducer,
  [NameSpace.Promo]: promo.reducer
});
