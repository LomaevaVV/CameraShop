import {Link} from 'react-router-dom';
import { AppRoute, FetchStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setOrderPostStatus } from '../../store/order/order';


export default function BasketError(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleBtnClick = () => dispatch(setOrderPostStatus(FetchStatus.Idle));

  return (
    <div className="container">
      <h1 className="title title--h2">Не удалось оформить заказ</h1>
      <h3>
        <Link className="btn btn--purple product-card__btn" to={AppRoute.Basket} onClick={handleBtnClick}>Вернуться на страницу корзины</Link>
      </h3>
    </div>

  );
}
