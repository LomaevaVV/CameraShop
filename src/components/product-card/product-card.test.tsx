import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { ModalState } from '../../const';
import { makeFakeProduct, storeForFake } from '../../tests/mocks';
import ProductCard from './product-card';

const history = createMemoryHistory();
const fakeProduct = makeFakeProduct();

describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      APP: {
        selectedCameraId: undefined,
        ModalState: ModalState.Closed,
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <ProductCard camera={fakeProduct}/>
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText(`${fakeProduct.name}`)).toBeInTheDocument();
  });
});
