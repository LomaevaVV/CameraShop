import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Filters from './filters';

const history = createMemoryHistory();

describe('Component: Filters', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <Filters />
      </HistoryRouter>,
    );

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
  });
});
