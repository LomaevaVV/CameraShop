import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, MAX_CARDS_ON_PAGE } from '../const';
import { Cameras } from '../types/camera';
import { AppDispatch, State } from '../types/state';
import { toast } from 'react-toastify';
import { Promo } from '../types/promo';
import { generatePath } from 'react-router-dom';

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
