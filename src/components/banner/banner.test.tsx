import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import { makeFakePromo } from '../../tests/mocks';
import Banner from './banner';

const history = createMemoryHistory();
const fakePromo = makeFakePromo();

describe('Component: Banner', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <Banner promo={fakePromo}/>
      </HistoryRouter>,
    );

    expect(screen.getByText(`${fakePromo.name}`)).toBeInTheDocument();
    expect(screen.getByText('Профессиональная камера от известного производителя')).toBeInTheDocument();
  });
});
