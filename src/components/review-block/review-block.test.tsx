import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { ModalState, MORE_REVIEWS_STEP } from '../../const';
import { makeFakeReviews, storeForFake } from '../../tests/mocks';
import ReviewBlock from './review-block';

const history = createMemoryHistory();
const fakeReviews = makeFakeReviews();

describe('Component: ReviewBlock', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      APP: {
        reviewsAmount: MORE_REVIEWS_STEP,
        reviewsOnPage: MORE_REVIEWS_STEP,
        modalState: ModalState.Closed
      },
      REVIEWS: {
        reviews: fakeReviews,
      }
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <ReviewBlock reviews={fakeReviews}/>
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Отзывы')).toBeInTheDocument();
  });
});
