import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { ClassName, ModalState } from '../../const';
import { makeFakeProduct, storeForFake } from '../../tests/mocks';
import RatingBar from './rating-bar';

const history = createMemoryHistory();
const fakeProduct = makeFakeProduct();

describe('Component: RatingBar', () => {
  it('should render correctly in case not reviewCount', () => {
    const fakeStore = storeForFake({
      APP: {
        selectedCameraId: undefined,
        ModalState: ModalState.Closed,
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <RatingBar rating={fakeProduct.rating} ratingBarClassName={ClassName.ProductCard}/>
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText(`Рейтинг: ${fakeProduct.rating}`)).toBeInTheDocument();
    expect(screen.queryByTestId('rate__count')).toBeNull();
  });

  it('should render correctly in case reviewCount', () => {
    const fakeStore = storeForFake({
      APP: {
        selectedCameraId: undefined,
        ModalState: ModalState.Closed,
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <RatingBar rating={fakeProduct.rating} ratingBarClassName={ClassName.ProductCard} reviewCount={fakeProduct.reviewCount}/>
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText(`Рейтинг: ${fakeProduct.rating}`)).toBeInTheDocument();
    expect(screen.getByTestId('rate__count')).toBeInTheDocument();
  });
});
