import { FetchStatus } from '../../const';
import { useAppSelector } from '../../hooks/index';
import { getCameras, getCamerasFetchStatus } from '../../store/cameras/selectors';
import Error from '../error/error';
import Filters from '../filters/filters';
import Pagination from '../pagination/pagination';
import ProductCard from '../product-card/product-card';
import SortForm from '../sort-form/sort-form';

export default function Catalog(): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const camerasFetchStatus = useAppSelector(getCamerasFetchStatus);

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
