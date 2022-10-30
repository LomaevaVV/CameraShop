import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { makeFakeProduct, makeFakeReviewComment, storeForFake } from '../../tests/mocks';
import AddReviewModal from './add-review-modal';

const history = createMemoryHistory();
const fakeProduct = makeFakeProduct();
const fakeReviewComment = makeFakeReviewComment();

describe('Component: ReviewBlock', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      REVIEWS: {
        reviewComment: fakeReviewComment,
      }
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <AddReviewModal cameraId={fakeProduct.id} onClick={() => null}/>
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
  });
});
