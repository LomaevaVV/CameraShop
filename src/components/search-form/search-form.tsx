import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import cn from 'classnames';
import { fetchCamerasBySearchAction } from '../../store/api-actions';
import { getCamerasByName } from '../../store/cameras/selectors';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function SearchForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [listOpend, setListOpened] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const camerasByName = useAppSelector(getCamerasByName);

  const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(String(evt.target.value));

    if (inputValue) {
      dispatch(fetchCamerasBySearchAction(String(evt.target.value)));
      setListOpened(true);
    }
  };

  const handleCloseBtnClick = () => {
    setInputValue('');
    setListOpened(false);
  };

  const getFormClassName = () :string => cn('form-search', {
    'list-opened': listOpend
  });

  return (
    <div className={getFormClassName()}>
      <form >
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            onChange={handleSearchChange}
            value={inputValue}
          />
        </label>
        <ul className="form-search__select-list">
          {camerasByName.map((camera) => (
            <li
              className="form-search__select-item"
              tabIndex={0}
              key={camera.name}
            >
              <Link to={generatePath(AppRoute.Product, {id: String(camera.id)})}>
                {camera.name}
              </Link>
            </li>
          ))}
        </ul>
      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={handleCloseBtnClick}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}
