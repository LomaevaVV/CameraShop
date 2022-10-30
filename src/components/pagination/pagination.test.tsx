import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { MAX_CARDS_ON_PAGE } from '../../const';
import { FAKE_CAMERAS_AMOUNT, storeForFake } from '../../tests/mocks';
import Pagination from './pagination';

const history = createMemoryHistory();

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        camerasTotalCount: FAKE_CAMERAS_AMOUNT,
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <Pagination />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(`${Math.ceil(FAKE_CAMERAS_AMOUNT / MAX_CARDS_ON_PAGE)}`)).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
