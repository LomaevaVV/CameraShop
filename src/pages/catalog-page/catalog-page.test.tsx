import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeCameras, makeFakeCamerasInBasket, makeFakeProduct, makeFakePromo, storeForFake } from '../../tests/mocks';
import HistoryRoute from '../../components/history-route/history-route';
import CatalogPage from './catalog-page';
import { FetchStatus, ModalState } from '../../const';

const history = createMemoryHistory();
const fakePromo = makeFakePromo();
const fakeProduct = makeFakeProduct();
const fakeCameras = makeFakeCameras();
const fakeCamerasInBasket = makeFakeCamerasInBasket();

describe('Component: CatalogPage', () => {
  it('should render correctly', () => {

    const fakeStore = storeForFake({
      CAMERAS: {
        cameras: fakeCameras,
        camerasFetchStatus: FetchStatus.Success,
        product: fakeProduct,
        camerasInBasket: fakeCamerasInBasket
      },
      PROMO: {
        promo: fakePromo,
        promoFetchStatus: undefined,
      },
      APP: {
        ModalState: ModalState.Closed,
      },
    });

    render(

      <HistoryRoute history={history}>
        <Provider store={fakeStore}>
          <CatalogPage />
        </Provider>
      </HistoryRoute>

    );

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();

  });

});
