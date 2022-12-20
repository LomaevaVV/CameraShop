import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-route/history-route';
import OrderSuccess from './order-success';

const history = createMemoryHistory();

describe('Component: ReviewCard', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <OrderSuccess onClick={() => null}/>
      </HistoryRouter>,
    );

    expect(screen.getByText('Спасибо за покупку')).toBeInTheDocument();
  });
});
