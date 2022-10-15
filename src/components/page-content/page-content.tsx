import { Link, useLocation } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { useAppSelector } from '../../hooks';
import { Camera } from '../../types/camera';
import { getProduct } from '../../store/cameras/selectors';
import { AppRoute } from '../../const';

export default function PageContent({children}: PropsWithChildren): JSX.Element {
  const camera: Camera | undefined = useAppSelector(getProduct);
  const pathname = useLocation().pathname;

  return (
    <div className="page-content">
      <div className="breadcrumbs">
        <div className="container">
          <ul className="breadcrumbs__list">
            <li className="breadcrumbs__item">
              <Link className="breadcrumbs__link" to={AppRoute.Main}>Главная
                <svg width="5" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini"></use>
                </svg>
              </Link>
            </li>
            {pathname.includes(AppRoute.Catalog) &&
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  Каталог
                </span>
              </li>}
            {pathname.includes(AppRoute.Product.slice(0,8)) &&
              <>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog}>
                    Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">{camera?.name}</span>
                </li>
              </>}
          </ul>
        </div>
      </div>
      {children}
    </div>
  );
}
