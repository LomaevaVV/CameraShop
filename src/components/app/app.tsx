import {BrowserRouter, generatePath, Navigate, Route, Routes} from 'react-router-dom';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import { AppRoute, DEFOLT_CATALOG_PAGE } from '../../const';
import ProductPage from '../../pages/product-page/product-page';

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
          element={<CatalogPage />}
        />
        <Route
          path={AppRoute.Product}
          element={<ProductPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
