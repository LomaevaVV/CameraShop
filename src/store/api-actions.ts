import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, MAX_CARDS_ON_PAGE } from '../const';
import { Camera, Cameras } from '../types/camera';
import { AppDispatch, State } from '../types/state';
import { toast } from 'react-toastify';
import { Promo } from '../types/promo';
import { generatePath } from 'react-router-dom';
import { Reviews } from '../types/review';

export const fetchCamerasAction = createAsyncThunk<{data: Cameras; camerasTotalCount: string}, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (pageId, {extra: api}) => {
    try {
      const {data, headers} = await api.get<Cameras>(generatePath(APIRoute.Cameras, {FirstObjOnPageIdx: String((pageId - 1) * MAX_CARDS_ON_PAGE)}));

      return {
        data,
        camerasTotalCount: headers['x-total-count']
      };
    } catch(e) {
      toast.error('Cameras loading error', {
        position: toast.POSITION.TOP_CENTER,
      });

      throw e;
    }
  });


export const fetchPromoAction = createAsyncThunk<Promo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromo',
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get<Promo>(APIRoute.Promo);

      return data;
    } catch(e) {
      toast.error('Promo loading error', {
        position: toast.POSITION.TOP_CENTER,
      });

      throw e;
    }
  });


export const fetchProductAction = createAsyncThunk<Camera, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCamera',
  async (cameraId, {extra: api}) => {
    try {
      const {data} = await api.get<Camera>(generatePath(APIRoute.Camera, {id: String(cameraId)}));
      return data;
    } catch(e) {
      toast.error('Offer details loading error', {
        position: toast.POSITION.TOP_CENTER,
      });
      throw e;
    }
  });

export const fetchSimilarAction = createAsyncThunk<Cameras, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilar',
  async (offerId, {extra: api}) => {
    try {
      const {data} = await api.get<Cameras>(generatePath(APIRoute.Camera, {id: String(`${offerId}/similar`)}));

      return data;
    } catch(e) {
      toast.error('Nearby offers loading error', {
        position: toast.POSITION.TOP_CENTER,
      });

      throw e;
    }
  });

export const fetchReviewsAction = createAsyncThunk<Reviews, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (offerId, {extra: api}) => {
    try {
      const {data} = await api.get<Reviews>(generatePath(APIRoute.Camera, {id: String(`${offerId}/reviews`)}));

      return data;
    } catch(e) {
      toast.error('Reviews loading error', {
        position: toast.POSITION.TOP_CENTER,
      });

      throw e;
    }
  });