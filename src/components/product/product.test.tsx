import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import { makeFakeProduct } from '../../tests/mocks';
import Product from './product';

const history = createMemoryHistory();
const fakeProduct = makeFakeProduct();

describe('Component: Product', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <Product camera={fakeProduct}/>
      </HistoryRouter>,
    );

    expect(screen.getByText(`${fakeProduct.name}`)).toBeInTheDocument();
  });
});
