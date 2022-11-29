import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import Header from './header';
import { makeFakeCameras, storeForFake } from '../../tests/mocks';

const history = createMemoryHistory();
const fakeCameras = makeFakeCameras();

describe('Component: Header', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        camerasByName: fakeCameras,
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
