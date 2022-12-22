import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { AppRoute, FetchStatus, ModalState, MORE_REVIEWS_STEP } from '../../const';
import { storeForFake, makeFakeProduct, makeFakeCameras, makeFakeReviews, makeFakePromo } from '../../tests/mocks';
import HistoryRouter from '../history-route/history-route';
import App from './app';

const history = createMemoryHistory();
const fakeProduct = makeFakeProduct();
const fakeCameras = makeFakeCameras();
const fakeReviews = makeFakeReviews();
const fakePromo = makeFakePromo();

const fakeStore = storeForFake({
  CAMERAS: {
    cameras: fakeCameras,
    camerasFetchStatus: FetchStatus.Success,
    productFetchStatus: FetchStatus.Success,
    product: fakeProduct,
    similar: fakeCameras,
    camerasByName: [],
    priceRange: {camerasMinPrice: 0, camerasMaxPrice: 0},
    priceRangeFetchStatus: FetchStatus.Idle,
    carrentSearchParams: [],
    camerasInBasket: []
  },
  REVIEWS: {
    reviews: fakeReviews,
  },
  APP: {
    ModalState: ModalState.Closed,
    reviewsAmount: MORE_REVIEWS_STEP,
    reviewsOnPage: fakeReviews.slice(0, 3),
  },
  PROMO: {
    promo: fakePromo,
    promoFetchStatus: FetchStatus.Success,
  },
});

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('App Routing', () => {
  it('should render CatalogPage when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });

  it('should render "CatalogScreen" when user navigate to "/catalog"', () => {
    history.push(AppRoute.Catalog);

    render(fakeApp);

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });

  it('should render "ProductScreen" when user navigate to "/product/:id"', async () => {
    history.push(generatePath(AppRoute.Product, { id: String(fakeProduct.id) }));

    render(fakeApp);

    const product = await screen.findByText('Похожие товары');

    expect(product).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
  });
});
