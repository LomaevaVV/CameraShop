import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import SortForm from './sort-form';

const history = createMemoryHistory();

describe('Component: SortForm', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <SortForm />
      </HistoryRouter>,
    );

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
  });
});
