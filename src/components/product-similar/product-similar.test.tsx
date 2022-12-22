import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { FetchStatus, ModalState } from '../../const';
import { makeFakeCameras, storeForFake, makeFakeCamerasInBasket } from '../../tests/mocks';
import ProductSimilar from './product-similar';

const history = createMemoryHistory();
const fakeCameras = makeFakeCameras();
const fakeCamerasInBasket = makeFakeCamerasInBasket();

describe('Component: ProductSimilar', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      APP: {
        selectedCameraId: undefined,
        ModalState: ModalState.Closed,
      },
      CAMERAS: {
        priceRangeFetchStatus: FetchStatus.Idle,
        camerasInBasket: fakeCamerasInBasket
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <ProductSimilar cameras={fakeCameras}/>
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText(`${fakeCameras[0].name}`)).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });
});
