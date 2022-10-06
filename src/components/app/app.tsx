import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Catalog from '../../pages/catalog/catalog';
import { AppRoute } from '../../const';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Navigate to={AppRoute.Catalog} />}
        />
        <Route
          path={AppRoute.Catalog}
          element={<Catalog />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
