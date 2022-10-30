import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import { makeFakeProduct } from '../../tests/mocks';
import AddBasketModal from './add-basket-modal';

const history = createMemoryHistory();
const fakeProduct = makeFakeProduct();

describe('Component: AddBasketModal', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <AddBasketModal camera={fakeProduct} onClick={ () => null }/>
      </HistoryRouter>,
    );

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
  });
});
