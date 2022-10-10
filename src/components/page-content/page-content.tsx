import { Link } from 'react-router-dom';
import Catalog from '../catalog/catalog';

export default function PageContent(): JSX.Element {
  return (
    <div className="page-content">
      <div className="breadcrumbs">
        <div className="container">
          <ul className="breadcrumbs__list">
            <li className="breadcrumbs__item">
              <Link className="breadcrumbs__link" to="index.html">Главная
                <svg width="5" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini"></use>
                </svg>
              </Link>
            </li>
            <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
            </li>
          </ul>
        </div>
      </div>
      <Catalog />
    </div>
  );
}
