import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../../components/history-route/history-route';
import NotFoundPage from './not-found-page';
import { makeFakeCameras, storeForFake } from '../../tests/mocks';
import { Provider } from 'react-redux';

const history = createMemoryHistory();
const fakeCameras = makeFakeCameras();

describe('Component: ProductPage', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        camerasByName: fakeCameras,
      },
    });

    render(

      <HistoryRoute history={history}>
        <Provider store={fakeStore}>
          <NotFoundPage />
        </Provider>
      </HistoryRoute>

    );

    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();

  });

});
