import { SortOrder, SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { setSortOrder, setSortType } from '../../store/app-process/app-process';
import { getSortType } from '../../store/app-process/selectors';

export default function SortForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(getSortType);

  const handleClickOrderAsc = () => {
    dispatch(setSortOrder(SortOrder.Asc));
    sortType === '' && dispatch(setSortType(SortType.Price));
  };

  const handleClickOrderDesc = () => {
    dispatch(setSortOrder(SortOrder.Desc));
    sortType === '' && dispatch(setSortType(SortType.Price));
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div
              onClick={() => dispatch(setSortType(SortType.Price))}
              className="catalog-sort__btn-text"
            >
              <input type="radio" id="sortPrice" name="sort" />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div
              onClick={() => dispatch(setSortType(SortType.Rating))}
              className="catalog-sort__btn-text"
            >
              <input type="radio" id="sortPopular" name="sort" />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div
              onClick={handleClickOrderAsc}
              className="catalog-sort__btn catalog-sort__btn--up"
            >
              <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию" />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div
              onClick={handleClickOrderDesc}
              className="catalog-sort__btn catalog-sort__btn--down"
            >
              <input type="radio" id="down" name="sort-icon" aria-label="По убыванию" />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
