import {BrowserRouter, generatePath, Navigate, Route, Routes} from 'react-router-dom';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import { AppRoute, DEFOLT_CATALOG_PAGE } from '../../const';
import ProductPage from '../../pages/product-page/product-page';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
