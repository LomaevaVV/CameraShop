import { useSearchParams } from 'react-router-dom';
import { FetchStatus, FilterNames, FilterTitles } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCamerasFetchStatus, getPriceRangeFetchStatus } from '../../store/cameras/selectors';
import PriceRange from './price-range';

export default function Filters(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const priceRangeFetchStatus = useAppSelector(getPriceRangeFetchStatus);
  const camerasFetchStatus = useAppSelector(getCamerasFetchStatus);

  const handleFilterInputChange = (titleOfFilter: string, nameOfFilter: string) => {
    const filterGroop = FilterNames[titleOfFilter];

    if (searchParams.getAll(titleOfFilter).includes(filterGroop[nameOfFilter])) {
      const newParams = Array.from(searchParams.entries())
        .filter(([_, currentValue]) => currentValue !== filterGroop[nameOfFilter]);
      setSearchParams(new URLSearchParams(newParams));
    } else {
      searchParams.append(titleOfFilter, filterGroop[nameOfFilter]);
      setSearchParams(searchParams);
    }
  };

  const isDisabeled = (nameOfFilter: string) => {
    if (nameOfFilter === 'film' || nameOfFilter === 'snapshot') {
      return searchParams.getAll('category').includes('Видеокамера') && !searchParams.getAll('category').includes('Фотоаппарат');
    }
  };

  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            {priceRangeFetchStatus === FetchStatus.Success && <PriceRange />}
          </fieldset>


          {Object.keys(FilterNames).map((titleOfFilter) => {
            const filterNames = FilterNames[titleOfFilter];
            return (
              <fieldset
                className="catalog-filter__block"
                key={titleOfFilter}
              >
                <legend className="title title--h5">{FilterTitles[titleOfFilter]}</legend>
                {Object.keys(filterNames).map((nameOfFilter) => (
                  <div
                    className="custom-checkbox catalog-filter__item"
                    key={nameOfFilter}
                  >
                    <label>
                      <input
                        type="checkbox"
                        name={nameOfFilter}
                        onChange={() => handleFilterInputChange(titleOfFilter, nameOfFilter)}
                        disabled = {isDisabeled(nameOfFilter) || camerasFetchStatus === FetchStatus.Loading}
                        defaultChecked = {searchParams.getAll(titleOfFilter).includes(filterNames[nameOfFilter])}
                      />
                      <span className="custom-checkbox__icon"></span>
                      <span className="custom-checkbox__label">{filterNames[nameOfFilter]}</span>
                    </label>
                  </div>
                ))}
              </fieldset>
            );})}
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={() => setSearchParams(new URLSearchParams())}
            disabled={camerasFetchStatus === FetchStatus.Loading}
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}
