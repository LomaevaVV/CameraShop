import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import Catalog from './catalog';
import { FetchStatus } from '../../const';
import { makeFakeCameras, storeForFake } from '../../tests/mocks';

const history = createMemoryHistory();
const fakeCameras = makeFakeCameras();

describe('Component: Catalog', () => {
  it('should render catalog in case camerasFetchStatus = Success', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        cameras: fakeCameras,
        camerasFetchStatus: FetchStatus.Success,
        carrentSearchParams: [],
        camerasTotalCount: 0,
      },
      APP: {
        sortType: null,
        sortOrder: null,
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <Catalog />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });

  it('should render Error in case camerasFetchStatus = Rejected', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        camerasFetchStatus: FetchStatus.Rejected,
      },
      APP: {
        sortType: null,
        sortOrder: null,
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <Catalog />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Не удалось загрузить каталог')).toBeInTheDocument();
  });
});
