import {generatePath, Navigate, Route, Routes} from 'react-router-dom';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import { AppRoute, DEFAULT_CATALOG_PAGE } from '../../const';
import ProductPage from '../../pages/product-page/product-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import BasketPage from '../../pages/basket-page/basket-page';

function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<Navigate to={generatePath(AppRoute.CatalogPage, { page: String(DEFAULT_CATALOG_PAGE) })} />}
      />
      <Route
        path={AppRoute.Catalog}
        element={<Navigate to={generatePath(AppRoute.CatalogPage, { page: String(DEFAULT_CATALOG_PAGE) })} />}
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
      <Route
        path={AppRoute.Basket}
        element={<BasketPage />}
      />
    </Routes>
  );
}

export default App;
