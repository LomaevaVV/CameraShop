import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { ModalState } from '../../const';
import { makeFakeProduct, storeForFake } from '../../tests/mocks';
import Modal from './modal';

const history = createMemoryHistory();
const fakeProduct = makeFakeProduct();

describe('Component: Modal', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      APP: {
        modalState: ModalState.AddBasket,
        selectidCard: fakeProduct,
      },
      CAMERAS: {
        camera: fakeProduct,
      }
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <Modal modalState={ModalState.AddBasket}/>
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });
});
