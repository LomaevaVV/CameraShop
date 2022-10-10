import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import { store } from '../../store';
import { fetchCamerasAction } from '../../store/api-actions';


export default function Error(): JSX.Element {
  const onErrorButtonHover = () => {
    store.dispatch(fetchCamerasAction());
  };

  return (
    <div className="container">
      <h1 className="title title--h2">Не удалось загрузить каталог</h1>
      <h3>
        <Link className="btn btn--purple product-card__btn" to={AppRoute.Main} onClick={onErrorButtonHover}>Попробовать снова</Link>
      </h3>
    </div>

  );
}
