import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-route/history-route';
import { makeFakeProduct } from '../../../tests/mocks';
import AddBasketModal from './basket-modal';
import { ModalState } from '../../../const';

const history = createMemoryHistory();
const fakeProduct = makeFakeProduct();
const fakeModalState = ModalState.AddBasket;

describe('Component: AddBasketModal', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <AddBasketModal modalState={fakeModalState} camera={fakeProduct} onClick={ () => null }/>
      </HistoryRouter>,
    );

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
  });
});
