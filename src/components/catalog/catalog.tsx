import { useEffect} from 'react';
import { generatePath, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { queryParams, FetchStatus, MAX_CARDS_ON_PAGE, AppRoute, DEFAULT_CATALOG_PAGE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
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
    carrentSearchParams?.length > 0 && setsearhParams(carrentSearchParams);
  }, [activePage, carrentSearchParams, setsearhParams, sortOrder, sortType]);

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
    dispatch(fetchPriceRangeAction(camerasFetchParams));
  }, [activePage, carrentSearchParams, dispatch, searchParams, sortOrder, sortType]);


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
  }, [dispatch, activePage, sortType, sortOrder, searchParams]);

  const cameras = useAppSelector(getCameras);
  const camerasFetchStatus = useAppSelector(getCamerasFetchStatus);

  if (
    camerasFetchStatus === FetchStatus.Idle ||
    camerasFetchStatus === FetchStatus.Loading
  ) {
    return <Loader />;
  }

  return (
    (pagesAmount < activePage && camerasTotalCount !== 0)
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
