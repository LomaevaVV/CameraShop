import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeCameras, makeFakeProduct, makeFakeReviews, storeForFake } from '../../tests/mocks';
import HistoryRoute from '../../components/history-route/history-route';
import ProductPage from './product-page';
import { FetchStatus, ModalState, MORE_REVIEWS_STEP } from '../../const';

const history = createMemoryHistory();
const fakeProduct = makeFakeProduct();
const fakeCameras = makeFakeCameras();
const fakeReviews = makeFakeReviews();

describe('Component: ProductPage', () => {
  it('should render correctly', () => {

    const fakeStore = storeForFake({
      CAMERAS: {
        cameras: fakeCameras,
        camerasFetchStatus: FetchStatus.Success,
        productFetchStatus: FetchStatus.Success,
        product: fakeProduct,
        similar: fakeCameras,
      },
      REVIEWS: {
        reviews: fakeReviews,
      },
      APP: {
        ModalState: ModalState.Closed,
        reviewsAmount: MORE_REVIEWS_STEP,
        reviewsOnPage: fakeReviews.slice(0, 3),
      },
    });

    render(

      <HistoryRoute history={history}>
        <Provider store={fakeStore}>
          <ProductPage />
        </Provider>
      </HistoryRoute>

    );

    expect(screen.getByText('Похожие товары')).toBeInTheDocument();

  });

});
