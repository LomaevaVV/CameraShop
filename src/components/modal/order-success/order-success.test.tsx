import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-route/history-route';
import OrderSuccess from './order-success';
import { storeForFake } from '../../../tests/mocks';
import { FetchStatus, ModalState } from '../../../const';
import { Provider } from 'react-redux';

const history = createMemoryHistory();

describe('Component: ReviewCard', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      APP: {
        modalState: ModalState.OrderSuccess,
      },
      ORDER: {
        oederPostStatus: FetchStatus.Success
      }
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <OrderSuccess onClick={() => null}/>
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Спасибо за покупку')).toBeInTheDocument();
  });
});
