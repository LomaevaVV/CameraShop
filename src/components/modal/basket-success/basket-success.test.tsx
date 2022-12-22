import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../history-route/history-route';
import BasketModal from './basket-success';
import { makeFakeCamerasInBasket, storeForFake } from '../../../tests/mocks';
import { ModalState } from '../../../const';

const history = createMemoryHistory();
const fakeCamerasInBasket = makeFakeCamerasInBasket();

describe('Component: BasketModal', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        camerasInBasket: fakeCamerasInBasket
      },
      APP: {
        modalState: ModalState.OrderSuccess,
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <BasketModal onClick={() => null}/>
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Товар успешно добавлен в корзину')).toBeInTheDocument();
  });
});
