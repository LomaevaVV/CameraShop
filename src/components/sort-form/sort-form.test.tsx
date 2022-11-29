import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import SortForm from './sort-form';
import { storeForFake } from '../../tests/mocks';
import { FetchStatus } from '../../const';

const history = createMemoryHistory();

describe('Component: SortForm', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      APP: {
        sortType: FetchStatus.Idle,
        sortOrder: FetchStatus.Idle,
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <SortForm />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
  });
});
