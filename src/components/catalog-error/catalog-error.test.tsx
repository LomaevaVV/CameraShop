import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import CatalogError from './catalog-error';

const history = createMemoryHistory();

describe('Component: Error', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <CatalogError />
      </HistoryRouter>,
    );

    expect(screen.getByText('Не удалось загрузить каталог')).toBeInTheDocument();
  });
});
