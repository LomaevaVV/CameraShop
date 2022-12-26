import { Link, useLocation } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Camera } from '../../types/camera';
import { getProduct } from '../../store/cameras/selectors';
import { AppRoute, PAGE_PATH_ARRAY_IDX } from '../../const';
import { setCarrentSearchParams } from '../../store/cameras/cameras';

export default function PageContent({children}: PropsWithChildren): JSX.Element {
  const camera: Camera | undefined = useAppSelector(getProduct);
  const pathname = useLocation().pathname;
  const getPageName = (path: string) => path.split('/')[PAGE_PATH_ARRAY_IDX];
  const dispatch = useAppDispatch();

  return (
    <div className="page-content">
      <div className="breadcrumbs">
        <div className="container">
          <ul className="breadcrumbs__list">
            <li className="breadcrumbs__item">
              <Link className="breadcrumbs__link" onClick={() => dispatch(setCarrentSearchParams([]))} to={AppRoute.Main}>Главная
                <svg width="5" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini"></use>
                </svg>
              </Link>
            </li>
            {pathname.includes(getPageName(AppRoute.Catalog)) &&
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  Каталог
                </span>
              </li>}
            {pathname.includes(getPageName(AppRoute.Product)) &&
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
                  <span className="breadcrumbs__link breadcrumbs__link--active" data-testid='camera_breadcrumb'>{camera?.name}</span>
                </li>
              </>}
            {pathname.includes(getPageName(AppRoute.Basket)) &&
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
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    Корзина
                  </span>
                </li>
              </>}
          </ul>
        </div>
      </div>
      {children}
    </div>
  );
}
