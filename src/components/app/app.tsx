import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Catalog from '../../pages/catalog/catalog';
import { AppRoute } from '../../const';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Catalog}
          element={<Catalog />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
