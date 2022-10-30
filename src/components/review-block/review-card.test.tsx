import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import { makeFakeReviews } from '../../tests/mocks';
import ReviewCard from './review-card';

const history = createMemoryHistory();
const fakeReviews = makeFakeReviews();

describe('Component: ReviewCard', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <ReviewCard review={fakeReviews[0]}/>
      </HistoryRouter>,
    );

    expect(screen.getByText(`${fakeReviews[0].userName}`)).toBeInTheDocument();
  });
});
