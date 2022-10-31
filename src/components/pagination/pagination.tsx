import { generatePath, Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { AppRoute, DEFAULT_CATALOG_PAGE, MAX_CARDS_ON_PAGE, PAGINATION_STEP } from '../../const';
import { useAppSelector } from '../../hooks/index';
import { getCamerasTotalCount } from '../../store/cameras/selectors';


export default function Pagination(): JSX.Element {
  const activePage = Number(useParams().page);
  const camerasTotalCount = useAppSelector(getCamerasTotalCount);
  const pagesAmount = Math.ceil(camerasTotalCount / MAX_CARDS_ON_PAGE);
  const pages = Array.from({ length: pagesAmount }, (v, i) => i + 1);

  const getPaginItemClassName = (page: number) :string=> cn('pagination__link', {
    'pagination__link--active': activePage === page
  });

  return (
    <div className="pagination" data-testid='pagination'>
      <ul className="pagination__list">
        {activePage !== DEFAULT_CATALOG_PAGE &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={generatePath(AppRoute.CatalogPage, { page: String(activePage - PAGINATION_STEP) })}
            >
              Назад
            </Link>
          </li>}


        {pages.map((page) => (
          <li key={page} className="pagination__item">
            <Link
              className={getPaginItemClassName(page)}
              to={generatePath(AppRoute.CatalogPage, { page: String(page) })}
            >
              {`${page} `}
            </Link>
          </li>
        ))}

        {activePage !== pagesAmount &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={generatePath(AppRoute.CatalogPage, { page: String(activePage + PAGINATION_STEP) })}
            >
              Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
}

