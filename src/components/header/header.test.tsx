import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import Header from './header';
import { makeFakeCamerasInBasket, makeFakeCameras, storeForFake } from '../../tests/mocks';

const history = createMemoryHistory();
const fakeCameras = makeFakeCameras();
const fakeCamerasInBasket = makeFakeCamerasInBasket();

describe('Component: Header', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        camerasByName: fakeCameras,
        camerasInBasket: fakeCamerasInBasket
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <Header />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Каталог')).toBeInTheDocument();
  });
});
