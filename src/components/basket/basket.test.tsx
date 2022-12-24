import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import Basket from './basket';
import { FetchStatus } from '../../const';
import { makeFakeCameras, makeFakeCamerasInBasket, storeForFake } from '../../tests/mocks';

const history = createMemoryHistory();
const fakeCameras = makeFakeCameras();
const fakeCamerasInBasket = makeFakeCamerasInBasket();

describe('Component: Basket', () => {
  it('should render basket correctly', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        cameras: fakeCameras,
        camerasFetchStatus: FetchStatus.Success,
        carrentSearchParams: [],
        camerasTotalCount: 0,
        camerasInBasket: fakeCamerasInBasket
      },
      APP: {
        sortType: null,
        sortOrder: null,
      },
      COUPONS: {
        coupon: '',
        discount: 0,
        couponPostStatus: FetchStatus.Idle,
      },
      ORDER: {
        orderPostStatus: FetchStatus.Idle,
      }
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <Basket />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Корзина')).toBeInTheDocument();
    expect(screen.getByText(`${fakeCamerasInBasket[0].camera.name}`)).toBeInTheDocument();
  });
});
