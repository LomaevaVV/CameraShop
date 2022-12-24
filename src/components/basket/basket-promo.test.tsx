import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { FetchStatus } from '../../const';
import { storeForFake } from '../../tests/mocks';
import BasketPromo from './basket-promo';

const history = createMemoryHistory();

describe('Component: BasketItem', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      COUPONS: {
        coupon: '',
        discount: 0,
        couponPostStatus: FetchStatus.Idle
      }
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <BasketPromo />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Промокод')).toBeInTheDocument();
  });
});
