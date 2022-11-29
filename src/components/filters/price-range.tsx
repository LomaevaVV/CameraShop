import { useSearchParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getPriceRange, getPriceRangeByFilters } from '../../store/cameras/selectors';
import { queryParams } from '../../const';
import { setCarrentSearchParams } from '../../store/cameras/cameras';


export default function PriceRange(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const {camerasMinPrice, camerasMaxPrice} = useAppSelector(getPriceRange);
  const priceRangeByFilters = useAppSelector(getPriceRangeByFilters);

  const [priceRangeData, setPriceRangeData] = useState({
    priceDown: '',
    priceUp: ''
  });

  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!isRenderedRef.current) {
      const minPriceBySeachParams = Array.from(searchParams.entries())
        .filter(([paramName, _]) => paramName === queryParams.minPrice);

      const maxPriceBySeachParams = Array.from(searchParams.entries())
        .filter(([paramName, _]) => paramName === queryParams.maxPrice);

      setPriceRangeData(() => ({
        ...priceRangeData,
        priceDown: minPriceBySeachParams.length === 1 ? String(priceRangeByFilters.camerasMinPrice) : '',
        priceUp: maxPriceBySeachParams.length === 1 ? String(priceRangeByFilters.camerasMaxPrice) : '',
      }));
      isRenderedRef.current = true;
    }
  }, [dispatch, priceRangeByFilters.camerasMaxPrice, priceRangeByFilters.camerasMinPrice, priceRangeData, searchParams]);

  const makeSearchParams = (paramKey: string, paramValue: string) => {
    if (paramValue === '' ) {
      searchParams.delete(paramKey);
    } else {
      if (searchParams.has(paramKey)) {
        searchParams.set(paramKey, paramValue);
      } else {
        searchParams.append(paramKey, paramValue);
      }
    }

    setSearchParams(searchParams);
    dispatch(setCarrentSearchParams(Array.from(searchParams.entries())));
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    evt.preventDefault();
    const {name, value} = evt.target;

    Number(value) >= 0 && setPriceRangeData(() => ({
      ...priceRangeData,
      [name]: value
    }));
  };

  const handleInputDownBlure = () => {
    if (Number(priceRangeData.priceDown) <= camerasMinPrice
    || Number(priceRangeData.priceDown) > camerasMaxPrice
    || (!(Number(priceRangeData.priceDown) < Number(priceRangeData.priceUp)) && priceRangeData.priceUp !== '')) {
      setPriceRangeData(() => ({
        ...priceRangeData,
        priceDown: ''
      }));
    }

    makeSearchParams(queryParams.minPrice, priceRangeData.priceDown);
  };

  const handleInputUpBlure = () => {
    if (Number(priceRangeData.priceUp) < camerasMinPrice
    || Number(priceRangeData.priceUp) >= camerasMaxPrice
    || (!(Number(priceRangeData.priceDown) < Number(priceRangeData.priceUp)) && priceRangeData.priceDown !== '')) {
      setPriceRangeData(() => ({
        ...priceRangeData,
        priceUp: ''
      }));
    }

    makeSearchParams(queryParams.maxPrice, priceRangeData.priceUp);
  };

  return (
    <div className="catalog-filter__price-range">
      <div className="custom-input">
        <label>
          <input
            type="number"
            name="priceDown"
            placeholder={String(camerasMinPrice)}
            onChange={handleInputChange}
            value={priceRangeData.priceDown}
            onBlur={handleInputDownBlure}
          />
        </label>
      </div>
      <div className="custom-input">
        <label>
          <input
            type="number"
            name="priceUp"
            placeholder={String(camerasMaxPrice)}
            onChange={handleInputChange}
            value={priceRangeData.priceUp}
            onBlur={handleInputUpBlure}
          />
        </label>
      </div>
    </div>
  );
}
