import { useSearchParams } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCarrentSearchParams, getPriceRange } from '../../store/cameras/selectors';
import { queryParams } from '../../const';
import { setCarrentSearchParams } from '../../store/cameras/cameras';

export default function PriceRange(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const {camerasMinPrice, camerasMaxPrice} = useAppSelector(getPriceRange);
  const carrentSearchParams = useAppSelector(getCarrentSearchParams);
  const priceDownParam = carrentSearchParams.filter(([currentKey,_]) => currentKey === queryParams.minPrice);
  const priceUpParam = carrentSearchParams.filter(([currentKey,_]) => currentKey === queryParams.maxPrice);

  const [priceRangeData, setPriceRangeData] = useState({
    priceDown: priceDownParam.length > 0 ? priceDownParam[0][1] : '',
    priceUp: priceUpParam.length > 0 ? priceUpParam[0][1] : '',
  });

  const isNotInPriceRange = (value: string) => Number(value) < Number(camerasMinPrice) || Number(value) > Number(camerasMaxPrice);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    evt.preventDefault();
    const {name, value} = evt.target;

    Number(value) >= 0 && setPriceRangeData(() => ({
      ...priceRangeData,
      [name]: value
    }));
  };

  const makeSearchParams = (paramKey: string, paramValue: string) => {
    if (paramValue === '' ) {
      searchParams.delete(paramKey);}

    if (paramValue !== '' ) {
      if (searchParams.has(paramKey)) {
        searchParams.set(paramKey, paramValue);
      }

      if (!searchParams.has(paramKey)) {
        searchParams.append(paramKey, paramValue);
      }
    }

    setSearchParams(searchParams);
    dispatch(setCarrentSearchParams(Array.from(searchParams.entries())));
  };

  const handleInputDownBlure = () => {
    let paramValue = priceRangeData.priceDown;
    if (isNotInPriceRange(paramValue)
     || (priceRangeData.priceUp !== '' && Number(paramValue) > Number(priceRangeData.priceUp))) {
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
    if (isNotInPriceRange(paramValue)
     || (priceRangeData.priceDown !== '' && Number(paramValue) < Number(priceRangeData.priceDown))) {
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

