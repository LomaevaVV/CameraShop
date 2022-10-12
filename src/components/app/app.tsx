import {BrowserRouter, generatePath, Navigate, Route, Routes} from 'react-router-dom';
import Catalog from '../../pages/catalog/catalog';
import { AppRoute, DEFOLT_CATALOG_PAGE } from '../../const';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Navigate to={generatePath(AppRoute.CatalogPage, { page: String(DEFOLT_CATALOG_PAGE) })} />}
        />
        <Route
          path={AppRoute.Catalog}
          element={<Navigate to={generatePath(AppRoute.CatalogPage, { page: String(DEFOLT_CATALOG_PAGE) })} />}
        />
        <Route
          path={AppRoute.CatalogPage}
          element={<Catalog />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
