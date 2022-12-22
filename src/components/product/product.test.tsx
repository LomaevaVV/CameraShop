import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Product from './product';
import { makeFakeProduct, storeForFake } from '../../tests/mocks';
import { FetchStatus } from '../../const';
import { Provider } from 'react-redux';

const history = createMemoryHistory();
const fakeProduct = makeFakeProduct();

describe('Component: Product', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        product: fakeProduct,
        productFetchStatus: FetchStatus.Success
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <Product camera={fakeProduct}/>
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText(`${fakeProduct.name}`)).toBeInTheDocument();
  });
});
