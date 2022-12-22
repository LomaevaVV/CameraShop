import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-route/history-route';
import { makeFakeCamerasInBasket, makeFakeProduct } from '../../../tests/mocks';
import { FetchStatus, ModalState } from '../../../const';
import BasketModal from './basket-modal';
import { Provider } from 'react-redux';
import { storeForFake } from '../../../tests/mocks';

const history = createMemoryHistory();
const fakeProduct = makeFakeProduct();
const fakeCamerasInBasket = makeFakeCamerasInBasket();

describe('Component: BasketModal', () => {
  it('should render correctly in case of add item to basket', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        priceRangeFetchStatus: FetchStatus.Idle,
        camerasInBasket: fakeCamerasInBasket
      },
      APP: {
        modalState: ModalState.BasketAddItem,
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <BasketModal modalState={ModalState.BasketAddItem} camera={fakeProduct} onClick={ () => null }/>
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
  });

  it('should render correctly in case of del item to basket', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        priceRangeFetchStatus: FetchStatus.Idle,
        camerasInBasket: fakeCamerasInBasket
      },
      APP: {
        modalState: ModalState.BasketDelItem,
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <BasketModal modalState={ModalState.BasketDelItem} camera={fakeProduct} onClick={ () => null }/>
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Удалить этот товар?')).toBeInTheDocument();
  });
});
