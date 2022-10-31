import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../../components/history-route/history-route';
import NotFoundPage from './not-found-page';

const history = createMemoryHistory();

describe('Component: ProductPage', () => {
  it('should render correctly', () => {

    render(

      <HistoryRoute history={history}>
        <NotFoundPage />
      </HistoryRoute>

    );

    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();

  });

});
