import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { ModalState } from '../../../const';
import HistoryRouter from '../../history-route/history-route';
import SuccessModal from './success-modal';

const history = createMemoryHistory();

describe('Component: ReviewCard', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <SuccessModal modalState={ModalState.ReviewSuccess} onClick={() => null}/>
      </HistoryRouter>,
    );

    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
  });
});
