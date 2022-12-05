import { SortOrder, SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { setSortOrder, setSortType } from '../../store/app-process/app-process';
import { getSortOrder, getSortType } from '../../store/app-process/selectors';

export default function SortForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector(getSortType);
  const sortOrder = useAppSelector(getSortOrder);

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text" >
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                onChange={() => {
                  dispatch(setSortType(SortType.Price));
                  sortOrder === null && dispatch(setSortOrder(SortOrder.Asc));
                }}
                checked={sortType === SortType.Price}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                onChange={() => {
                  dispatch(setSortType(SortType.Rating));
                  sortOrder === null && dispatch(setSortOrder(SortOrder.Asc));
                }}
                checked={sortType === SortType.Rating}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio" id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                onChange={() => {
                  dispatch(setSortOrder(SortOrder.Asc));
                  sortType === null && dispatch(setSortType(SortType.Price));
                }}
                checked={sortOrder === SortOrder.Asc}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                onChange={() => {
                  dispatch(setSortOrder(SortOrder.Desc));
                  sortType === null && dispatch(setSortType(SortType.Price));
                }}
                checked={sortOrder === SortOrder.Desc}
              />
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
