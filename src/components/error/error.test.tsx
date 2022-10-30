import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Error from './error';

const history = createMemoryHistory();

describe('Component: Error', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <Error />
      </HistoryRouter>,
    );

    expect(screen.getByText('Не удалось загрузить каталог')).toBeInTheDocument();
  });
});
