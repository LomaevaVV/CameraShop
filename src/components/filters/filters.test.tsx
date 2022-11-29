import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Filters from './filters';
import { Provider } from 'react-redux';
import { storeForFake } from '../../tests/mocks';
import { FetchStatus } from '../../const';

const history = createMemoryHistory();

describe('Component: Filters', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        camerasFetchStatus: FetchStatus.Idle,
        priceRangeFetchStatus: FetchStatus.Idle,
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <Filters />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
  });
});
