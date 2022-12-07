import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setCarrentSearchParams } from '../../store/cameras/cameras';
import SearchForm from '../search-form/search-form';

export default function Header(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={AppRoute.Main} aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" onClick={() => dispatch(setCarrentSearchParams([]))} to={AppRoute.Main}>Каталог</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to="#">Гарантии</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to="#">Доставка</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to="#">О компании</Link>
            </li>
          </ul>
        </nav>
        <SearchForm />
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </Link>
      </div>
    </header>
  );
}
