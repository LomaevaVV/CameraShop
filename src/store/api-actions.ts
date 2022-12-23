import { createAsyncThunk } from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import { APIRoute, queryParams, MAX_CARDS_ON_PAGE, ModalState, SortOrder, SortType} from '../const';
import { Camera, CamerasFetchParams, Cameras, CamerasPriceRange } from '../types/camera';
import { AppDispatch, State } from '../types/state';
import { toast } from 'react-toastify';
import { Promo } from '../types/promo';
import { generatePath } from 'react-router-dom';
import { Review, ReviewComment, Reviews } from '../types/review';
import { changeModalState } from './app-process/app-process';
import { setCoupon } from './coupons/coupons';
import { Order } from '../types/order';
import { setCamerasInBasket } from './cameras/cameras';

export const fetchCamerasAction = createAsyncThunk<{
  data: Cameras;
  camerasTotalCount: string;
}, CamerasFetchParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async ({pageId, sortType, sortOrder, minPrice, maxPrice, category, type, level}, { extra: api}) => {
    try {
      const {data, headers} = await api.get<Cameras>(APIRoute.Cameras,
        {params: {
          [queryParams.camerasAmountOnPage]: MAX_CARDS_ON_PAGE,
          [queryParams.firstCameraOnPage]: String((pageId - 1) * MAX_CARDS_ON_PAGE),
          [queryParams.sortType]: sortType ? String(sortType) : null,
          [queryParams.sortOrder]: sortOrder ? String(sortOrder) : null,
          [queryParams.minPrice]: minPrice,
          [queryParams.maxPrice]: maxPrice,
          [queryParams.type]: type,
          [queryParams.category]: category,
          [queryParams.level]: level,
        }});

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

export const fetchPriceRangeAction = createAsyncThunk<CamerasPriceRange, CamerasFetchParams, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchCamerasPriceRange',
    async ({minPrice, maxPrice, category, type, level}, {extra: api}) => {
      try {
        const cameraMinPrice = await api.get<Cameras>(APIRoute.Cameras,
          {params: {
            [queryParams.camerasAmountOnPage]: 1,
            [queryParams.sortType]: String(SortType.Price),
            [queryParams.SortOrder]: String(SortOrder.Asc),
            [queryParams.minPrice]: minPrice,
            [queryParams.maxPrice]: maxPrice,
            [queryParams.type]: type,
            [queryParams.category]: category,
            [queryParams.level]: level,
          }});

        const cameraMaxPrice = await api.get<Cameras>(APIRoute.Cameras,
          {params: {
            [queryParams.camerasAmountOnPage]: 1,
            [queryParams.sortType]: String(SortType.Price),
            [queryParams.sortOrder]: String(SortOrder.Desc),
            [queryParams.minPrice]: minPrice,
            [queryParams.maxPrice]: maxPrice,
            [queryParams.type]: type,
            [queryParams.category]: category,
            [queryParams.level]: level,
          }});

        return {
          camerasMinPrice: cameraMinPrice.data.length > 0 ? Number(cameraMinPrice.data[0].price) : 0,
          camerasMaxPrice: cameraMaxPrice.data.length > 0 ? Number(cameraMaxPrice.data[0].price) : 0,
        };
      } catch(e) {
        toast.error('Cameras price range loadig error', {
          position: toast.POSITION.TOP_CENTER,
        });

        throw e;
      }
    });


export const fetchCamerasBySearchAction = createAsyncThunk< Cameras, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchCamerasByName',
    async (name, {extra: api}) => {
      try {
        const {data} = await api.get<Cameras>(APIRoute.Cameras,
          {params: {
            [queryParams.seachByName]:name
          }});

        return data;
      } catch(e) {
        toast.error('Cameras search error', {
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
      toast.warn('Promo loading error', {
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
      const {data} = await api.get<Reviews>(generatePath(APIRoute.Camera, {id: String(`${offerId}/reviews?_sort=createAt&_order=desc`)}));

      return data;
    } catch(e) {
      toast.error('Reviews loading error', {
        position: toast.POSITION.TOP_CENTER,
      });

      throw e;
    }
  });

export const postReviewAction = createAsyncThunk<Review, ReviewComment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/post ReviewComment',
  async ({userName, review, rating, advantage, disadvantage, cameraId}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<Review>(APIRoute.Reviews,
        {userName, review, rating, advantage, disadvantage, cameraId}
      );

      dispatch(changeModalState(ModalState.ReviewSuccess));
      return data;
    } catch(e) {
      toast.error('Unable to to post a review', {
        position: toast.POSITION.TOP_CENTER,
      });

      throw e;
    }
  },
);

export const postCouponGetDiscount = createAsyncThunk<number, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/post Coupon',
  async (coupon, {extra: api, dispatch}) => {
    try {
      const {data} = await api.post<number>(APIRoute.Сoupons, {coupon});
      dispatch(setCoupon(coupon));
      return data;
    } catch(e) {
      toast.error('Coupon post error', {
        position: toast.POSITION.TOP_CENTER,
      });

      window.console.log(e);
      throw e;
    }
  });

export const postOrderAction = createAsyncThunk<void, Order, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/post Order',
    async ({camerasIds, coupon}, {extra: api, dispatch}) => {
      try {
        await api.post(APIRoute.Orders, {
          camerasIds: camerasIds,
          coupon: coupon
        });

        dispatch(changeModalState(ModalState.OrderSuccess));
        dispatch(setCamerasInBasket([]));
        dispatch(setCoupon(''));
      } catch(e) {
        window.console.log(e);
        toast.error('Order post error', {
          position: toast.POSITION.TOP_CENTER,
        });

        throw e;
      }
    });
