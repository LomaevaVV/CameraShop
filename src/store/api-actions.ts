import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { Cameras } from '../types/camera';
import { AppDispatch, State } from '../types/state';
import { toast } from 'react-toastify';
import { Promo } from '../types/promo';


export const fetchCamerasAction = createAsyncThunk<Cameras, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get<Cameras>(APIRoute.Cameras);

      return data;
    } catch(e) {
      toast.error('Offers loading error', {
        position: 'top-center',
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
        toast.error('Offers loading error', {
          position: 'top-center',
        });

        throw e;
      }
    });
