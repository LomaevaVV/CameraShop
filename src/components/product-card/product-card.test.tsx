import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { ModalState } from '../../const';
import { makeFakeCamerasInBasket, makeFakeProduct, storeForFake } from '../../tests/mocks';
import ProductCard from './product-card';

const history = createMemoryHistory();
const fakeProduct = makeFakeProduct();
const fakeCamerasInBasket = makeFakeCamerasInBasket();

describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      APP: {
        selectedCameraId: undefined,
        ModalState: ModalState.Closed,
      },
      CAMERAS: {
        camerasInBasket: fakeCamerasInBasket
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
