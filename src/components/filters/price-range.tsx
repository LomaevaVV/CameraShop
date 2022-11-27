import { useSearchParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasFetchParams, getPriceRange } from '../../store/cameras/selectors';
import { toast } from 'react-toastify';
import { QueryParams } from '../../const';
import { setCamerasFetchParams } from '../../store/cameras/cameras';


export default function PriceRange(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const {camerasMinPrice, camerasMaxPrice} = useAppSelector(getPriceRange);

  const [priceRangeData, setPriceRangeData] = useState({
    priceDown: '',
    priceUp: ''
  });

  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!isRenderedRef.current) {
      const minPriceBySeachParams = Array.from(searchParams.entries())
        .filter(([paramName, _]) => paramName === QueryParams.FilterMinPrice);

      const maxPriceBySeachParams = Array.from(searchParams.entries())
        .filter(([paramName, _]) => paramName === QueryParams.FilterMaxPrice);

      window.console.log(minPriceBySeachParams, maxPriceBySeachParams);

      setPriceRangeData(() => ({
        ...priceRangeData,
        priceDown: minPriceBySeachParams.length === 1 ? minPriceBySeachParams[0][1] : '',
        priceUp: maxPriceBySeachParams.length === 1 ? maxPriceBySeachParams[0][1] : '',
      }));
      isRenderedRef.current = true;
    }
  }, [dispatch, priceRangeData, searchParams]);

  const camerasFetchParams = useAppSelector(getCamerasFetchParams);

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

    let paramName = '';
    paramKey === 'price_gte' ? paramName = 'minPrice' : paramName = 'maxPrice';

    setSearchParams(searchParams);
    dispatch(setCamerasFetchParams({
      ...camerasFetchParams,
      [paramName]: paramValue
    }));
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    evt.preventDefault();
    const {name, value} = evt.target;

    setPriceRangeData(() => ({
      ...priceRangeData,
      [name]: value
    }));
  };

  const handleInputDownBlure = () => {
    if (Number(priceRangeData.priceDown) === camerasMinPrice) {
      setPriceRangeData(() => ({
        ...priceRangeData,
        priceDown: ''
      }));}

    if (Number(priceRangeData.priceDown) < camerasMinPrice
      || Number(priceRangeData.priceDown) > camerasMaxPrice) {
      setPriceRangeData(() => ({
        ...priceRangeData,
        priceDown: String(camerasMinPrice)
      }));
    }

    if (Number(priceRangeData.priceDown) === Number(priceRangeData.priceUp)) {
      toast.warn('По вашему запросу ничего не найдено', {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    makeSearchParams(QueryParams.FilterMinPrice, priceRangeData.priceDown);
  };

  const handleInputUpBlure = () => {
    if (Number(priceRangeData.priceUp) === camerasMaxPrice) {
      setPriceRangeData(() => ({
        ...priceRangeData,
        priceUp: ''
      }));}

    if (Number(priceRangeData.priceDown) > camerasMaxPrice
      || Number(priceRangeData.priceDown) <= camerasMinPrice) {
      setPriceRangeData(() => ({
        ...priceRangeData,
        priceUp: String(camerasMaxPrice)
      }));
    }

    if (Number(priceRangeData.priceDown) === Number(priceRangeData.priceUp)) {
      toast.warn('По вашему запросу ничего не найдено', {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    makeSearchParams(QueryParams.FilterMaxPrice, priceRangeData.priceUp);
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
