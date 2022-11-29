import { useEffect, useRef} from 'react';
import { generatePath, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { queryParams, FetchStatus, MAX_CARDS_ON_PAGE, AppRoute, DEFAULT_CATALOG_PAGE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { redirectToRoute } from '../../store/action';
import { fetchCamerasAction, fetchPriceRangeAction } from '../../store/api-actions';
import { getSortOrder, getSortType } from '../../store/app-process/selectors';
import { getCameras, getCamerasFetchStatus, getCamerasTotalCount, getCarrentSearchParams } from '../../store/cameras/selectors';
import Error from '../error/error';
import Filters from '../filters/filters';
import Loader from '../loader/loader';
import Pagination from '../pagination/pagination';
import ProductCard from '../product-card/product-card';
import SortForm from '../sort-form/sort-form';

export default function Catalog(): JSX.Element {
  const [searchParams, setsearhParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const sortType = useAppSelector(getSortType);
  const sortOrder = useAppSelector(getSortOrder);
  const carrentSearchParams = useAppSelector(getCarrentSearchParams);
  const activePage = Number(useParams().page);
  const camerasTotalCount = useAppSelector(getCamerasTotalCount);
  const pagesAmount = Math.ceil(camerasTotalCount / MAX_CARDS_ON_PAGE);

  useEffect(() => {
    dispatch(fetchPriceRangeAction());
    carrentSearchParams?.length !== 0 && setsearhParams(carrentSearchParams);
    window.console.log('ПАРАМЕТРЫ',carrentSearchParams);
  }, [carrentSearchParams, dispatch, setsearhParams]);

  useEffect(() => {
    const camerasFetchParams = {
      pageId: activePage,
      sortType: sortType,
      sortOrder: sortOrder,
      minPrice: searchParams.getAll(queryParams.minPrice),
      maxPrice: searchParams.getAll(queryParams.maxPrice),
      category: searchParams.getAll(queryParams.category),
      type: searchParams.getAll(queryParams.type),
      level: searchParams.getAll(queryParams.level)
    };
    dispatch(fetchCamerasAction(camerasFetchParams));
  }, [
    dispatch,
    activePage,
    sortType,
    sortOrder,
    searchParams,
    pagesAmount
  ]);

  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!isRenderedRef.current) {
      if (pagesAmount < activePage) {
        dispatch(redirectToRoute(AppRoute.Catalog));
      }
    }
    isRenderedRef.current = true;
  }, [activePage, dispatch, pagesAmount]);

  const cameras = useAppSelector(getCameras);
  const camerasFetchStatus = useAppSelector(getCamerasFetchStatus);

  if (
    camerasFetchStatus === FetchStatus.Idle ||
    camerasFetchStatus === FetchStatus.Loading
  ) {
    return <Loader />;
  }

  return (
    (pagesAmount < activePage)
      ? <Navigate to={generatePath(AppRoute.CatalogPage, { page: String(DEFAULT_CATALOG_PAGE) })}/>
      :
      <section className="catalog">
        {camerasFetchStatus === FetchStatus.Rejected
          ? <Error />
          :
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <Filters />
              <div className="catalog__content">
                <SortForm />
                <div className="cards catalog__cards">
                  { cameras.length > 0
                    ? cameras.map((item) => (
                      <ProductCard
                        key={item.id}
                        camera={item}
                      />
                    ))
                    : <div><h2>По вашему запросу ничего не найдено</h2></div>}
                </div>
                <Pagination />
              </div>
            </div>
          </div>}
      </section>
  );
}
