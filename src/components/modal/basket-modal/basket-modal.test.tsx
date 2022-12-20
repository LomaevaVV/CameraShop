import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-route/history-route';
import { makeFakeProduct } from '../../../tests/mocks';
import { ModalState } from '../../../const';
import BasketModal from './basket-modal';

const history = createMemoryHistory();
const fakeProduct = makeFakeProduct();
const fakeModalState = ModalState.BasketAddItem;

describe('Component: AddBasketModal', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <BasketModal modalState={fakeModalState} camera={fakeProduct} onClick={ () => null }/>
      </HistoryRouter>,
    );

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
  });
});
