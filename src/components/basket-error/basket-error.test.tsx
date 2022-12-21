import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import BasketError from './basket-error';
import { Provider } from 'react-redux';
import { storeForFake } from '../../tests/mocks';
import { FetchStatus } from '../../const';

const history = createMemoryHistory();

describe('Component: Error', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      ORDER: {
        orderPostStatus: FetchStatus.Rejected
      }
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <BasketError />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Не удалось оформить заказ')).toBeInTheDocument();
  });
});
