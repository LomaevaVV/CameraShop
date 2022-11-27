import { useEffect} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchQueryParams, FetchStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { fetchCamerasAction, fetchPriceRangeAction } from '../../store/api-actions';
import { getSortOrder, getSortType } from '../../store/app-process/selectors';
import { getCameras, getCamerasFetchStatus, getPriceRange } from '../../store/cameras/selectors';
import Error from '../error/error';
import Filters from '../filters/filters';
import Loader from '../loader/loader';
import Pagination from '../pagination/pagination';
import ProductCard from '../product-card/product-card';
import SortForm from '../sort-form/sort-form';

export default function Catalog(): JSX.Element {
  const activePage = Number(useParams().page);
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const sortType = useAppSelector(getSortType);
  const sortOrder = useAppSelector(getSortOrder);

  useEffect(() => {
    dispatch(fetchPriceRangeAction());
  }, [dispatch]);

  const {camerasMinPrice, camerasMaxPrice} = useAppSelector(getPriceRange);

  useEffect(() => {
    const makeCamerasFetchParams = (nameOfFilter: string) => {
      const filterValue: string[] = [];

      const filterTypes = Array.from(searchParams.entries())
        .filter(([paramName, _]) => paramName === fetchQueryParams[nameOfFilter]);

      if (filterTypes.length === 0) {
        return null;
      } else {
        filterTypes.forEach((param) => {
          filterValue.push(param[1]);
        });
      }
      return filterValue;
    };

    const camerasFetchParams = {
      pageId: activePage,
      sortType: sortType,
      sortOrder: sortOrder,
      minPrice: makeCamerasFetchParams('minPrice'),
      maxPrice: makeCamerasFetchParams('maxPrice'),
      category: makeCamerasFetchParams('category'),
      type: makeCamerasFetchParams('type'),
      level: makeCamerasFetchParams('level')
    };
    window.console.log('ПАРАМЕТРЫ ЗАПРОСА', camerasFetchParams);
    dispatch(fetchCamerasAction(camerasFetchParams));
  }, [dispatch, activePage, sortType, sortOrder, camerasMinPrice, camerasMaxPrice, searchParams]);

  const cameras = useAppSelector(getCameras);
  const camerasFetchStatus = useAppSelector(getCamerasFetchStatus);

  if (
    camerasFetchStatus === FetchStatus.Idle ||
    camerasFetchStatus === FetchStatus.Loading
  ) {
    return <Loader />;
  }

  return (
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
                {cameras.map((item) => (
                  <ProductCard
                    key={item.id}
                    camera={item}
                  />
                ))}
              </div>
              <Pagination />
            </div>
          </div>
        </div>}
    </section>
  );
}
