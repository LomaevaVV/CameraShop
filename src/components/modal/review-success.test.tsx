import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import ReviewSuccess from './review-success';

const history = createMemoryHistory();

describe('Component: ReviewCard', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <ReviewSuccess onClick={() => null}/>
      </HistoryRouter>,
    );

    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
  });
});
