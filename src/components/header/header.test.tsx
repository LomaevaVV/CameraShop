import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Header from './header';

const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <Header />
      </HistoryRouter>,
    );

    expect(screen.getByText('Каталог')).toBeInTheDocument();
  });
});
