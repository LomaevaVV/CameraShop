import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { generatePath } from 'react-router-dom';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { APIRoute, DEFAULT_CATALOG_PAGE } from '../const';
import { createAPI } from '../services/api';
import { makeFakeProduct, makeFakeReviewComment, makeFakePromo, makeFakeReviews, makeFakeCameras, FAKE_CAMERAS_AMOUNT } from '../tests/mocks';
import { State } from '../types/state';
import { Camera } from '../types/camera';
import { fetchProductAction, fetchPriceRangeAction, fetchCamerasAction, fetchPromoAction, fetchReviewsAction, fetchSimilarAction, postReviewAction } from './api-actions';
import { appProcess } from './app-process/app-process';


describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const fakeCameras = makeFakeCameras();

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchCamerasAction when GET /cameras?_limit=9&_start=:FirstObjOnPageIdx, where FirstObjOnPageIdx - is a idx of first product on page', async () => {
    mockAPI
      .onGet(APIRoute.Cameras)
      .reply(200, fakeCameras, { 'x-total-count': FAKE_CAMERAS_AMOUNT });

    const store = mockStore();

    await store.dispatch(fetchCamerasAction({
      pageId: DEFAULT_CATALOG_PAGE,
      sortType: null,
      sortOrder: null,
      minPrice: null,
      maxPrice: null,
      category: null,
      type: null,
      level: null,
    }));

    const actions = store.getActions().map(( { type }: Action<string> ) => type );

    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.fulfilled.type,
    ]);
  });

  it('should dispatch fetchPriceRangeAction when GET /cameras', async () => {
    mockAPI
      .onGet(APIRoute.Cameras)
      .reply(200, fakeCameras);

    const store = mockStore();

    await store.dispatch(fetchPriceRangeAction());

    const actions = store.getActions().map(({ type }: Action<string>) => type);

    expect(actions).toEqual([
      fetchPriceRangeAction.pending.type,
      fetchPriceRangeAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchPromoAction when GET /promo', async () => {
    const fakePromo = makeFakePromo();

    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, fakePromo);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({ type }: Action<string> ) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchProductAction and start fetchSimilarAction when GET /cameras/:id when "id" - is a camera id', async () => {
    const fakeProduct: Camera = makeFakeProduct();

    mockAPI
      .onGet(generatePath(APIRoute.Camera, { id: String(fakeProduct.id) }))
      .reply(200, fakeProduct);

    const store = mockStore();

    await store.dispatch(fetchProductAction(fakeProduct.id));

    const actions = store.getActions().map(({ type }: Action<string> ) => type);

    expect(actions).toEqual([
      fetchProductAction.pending.type,
      fetchProductAction.fulfilled.type,
    ]);
  });

  it('should dispatch fetchSimilarAction when GET "/cameras/:id/similar" when "id" - is a camera id', async () => {
    const fakeProduct: Camera = makeFakeProduct();
    const mockSimilarCameras = [makeFakeProduct(), makeFakeProduct(), makeFakeProduct()];

    mockAPI
      .onGet(generatePath(APIRoute.Camera, {id: String(`${fakeProduct.id}/similar`)}))
      .reply(200, mockSimilarCameras);

    const store = mockStore();

    await store.dispatch(fetchSimilarAction(fakeProduct.id));

    const actions = store.getActions().map(( { type }: Action<string> ) => type);

    expect(actions).toEqual([
      fetchSimilarAction.pending.type,
      fetchSimilarAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchReviewsAction when GET /cameras/:id/reviews?_sort=createAt&_order=desc&_end=:count when "id" - is a camera id and "count" - is a reviews count', async () => {
    const fakeProduct = makeFakeProduct();
    const fakeReviews = makeFakeReviews();

    mockAPI
      .onGet(generatePath(APIRoute.Camera, {id: String(`${fakeProduct.id}/reviews?_sort=createAt&_order=desc`)}))
      .reply(200, { data: fakeReviews });

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(fakeProduct.id));

    const actions = store.getActions().map(({ type }: Action<string> ) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type,
    ]);
  });

  it('should dispatch postReviewAction when POST /comments/:id', async () => {
    const fakeReviewComment = makeFakeReviewComment();

    mockAPI
      .onPost(APIRoute.Reviews)
      .reply(200, []);

    const store = mockStore();

    await store.dispatch(postReviewAction(fakeReviewComment));

    const actions = store.getActions().map(({ type }: Action<string> ) => type);

    expect(actions).toEqual([
      postReviewAction.pending.type,
      appProcess.actions.changeModalState.type,
      postReviewAction.fulfilled.type,
    ]);
  });
});
