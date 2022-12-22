import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import { makeFakeReviews, storeForFake } from '../../tests/mocks';
import ReviewCard from './review-card';
import { Provider } from 'react-redux';

const history = createMemoryHistory();
const fakeReviews = makeFakeReviews();

describe('Component: ReviewCard', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      REVIEWS: {
        reviews: makeFakeReviews(),
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <ReviewCard review={fakeReviews[0]}/>
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText(`${fakeReviews[0].userName}`)).toBeInTheDocument();
  });
});
