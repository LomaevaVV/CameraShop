import { useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { FetchStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { fetchCamerasAction } from '../../store/api-actions';
import { getCameras, getCamerasFetchStatus } from '../../store/cameras/selectors';
import Error from '../error/error';
import Filters from '../filters/filters';
import Loader from '../loader/loader';
import Pagination from '../pagination/pagination';
import ProductCard from '../product-card/product-card';
import SortForm from '../sort-form/sort-form';

export default function Catalog(): JSX.Element {
  const activePage = Number(useParams().page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCamerasAction(activePage));
  }, [dispatch, activePage]);

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
