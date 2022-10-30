import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const';
import { makeFakeProduct, storeForFake } from '../../tests/mocks';
import PageContent from './page-content';

const history = createMemoryHistory();
const fakeProduct = makeFakeProduct();

describe('Component: PageContent', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        camera: fakeProduct,
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <PageContent />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Главная')).toBeInTheDocument();
  });

  it('should render correctly in case Catalog', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        camera: fakeProduct,
      },
    });

    history.push(AppRoute.Catalog);

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <PageContent />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Каталог')).toHaveClass('breadcrumbs__link--active');
    expect(screen.queryByTestId('camera_breadcrumb')).toBeNull();
  });

  it('should render correctly in case Product', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        camera: fakeProduct,
      },
    });

    history.push(`/product/${fakeProduct.id}`);

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <PageContent />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Каталог')).not.toHaveClass('breadcrumbs__link--active');
    expect(screen.getByTestId('camera_breadcrumb')).toBeInTheDocument();
  });
});
