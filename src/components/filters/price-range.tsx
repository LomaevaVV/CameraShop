import { useSearchParams } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getPriceRange } from '../../store/cameras/selectors';
import { queryParams } from '../../const';
import { setCarrentSearchParams } from '../../store/cameras/cameras';

export default function PriceRange(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const {camerasMinPrice, camerasMaxPrice} = useAppSelector(getPriceRange);

  const [priceRangeData, setPriceRangeData] = useState({
    priceDown: '',
    priceUp: ''
  });

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    evt.preventDefault();
    const {name, value} = evt.target;

    Number(value) >= 0 && setPriceRangeData(() => ({
      ...priceRangeData,
      [name]: value
    }));
  };

  const makeSearchParams = (paramKey: string, paramValue: string) => {
    if (paramValue !== '' ) {
      if (searchParams.has(paramKey)) {
        searchParams.set(paramKey, paramValue);
      } else {
        searchParams.append(paramKey, paramValue);
      }
    }

    setSearchParams(searchParams);
    dispatch(setCarrentSearchParams(Array.from(searchParams.entries())));
  };

  const handleInputDownBlure = () => {
    let paramValue = priceRangeData.priceDown;
    if ((Number(paramValue) > Number(camerasMaxPrice))) {
      setPriceRangeData(() => ({
        ...priceRangeData,
        priceDown: ''
      }));
      paramValue = '';
    }

    makeSearchParams(queryParams.minPrice, paramValue);
  };

  const handleInputUpBlure = () => {
    let paramValue = priceRangeData.priceUp;
    if ((Number(camerasMinPrice) > Number(paramValue))) {
      setPriceRangeData(() => ({
        ...priceRangeData,
        priceUp: ''
      }));
      paramValue = '';
    }

    makeSearchParams(queryParams.maxPrice, paramValue);
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
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
    </fieldset>
  );
}

