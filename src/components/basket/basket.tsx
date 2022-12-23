import { getCamerasInBasket } from '../../store/cameras/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import BasketItem from './basket-item';
import BasketPromo from './basket-promo';
import { getCoupon, getDiscount } from '../../store/coupons/selectors';
import { getBasketValue } from '../../store/app-process/selectors';
import cn from 'classnames';
import { postOrderAction } from '../../store/api-actions';
import { getOrderPostStatus } from '../../store/order/selectors';
import { FetchStatus } from '../../const';

export default function Basket(): JSX.Element {
  const dispatch = useAppDispatch();

  const camerasInBasket = useAppSelector(getCamerasInBasket);
  const summaryValue = useAppSelector(getBasketValue);
  const discount = useAppSelector(getDiscount);
  const coupon = useAppSelector(getCoupon);
  const orderPostStatus = useAppSelector(getOrderPostStatus);

  const handleBasketClick = () => {
    const camerasIds = camerasInBasket.map((item) => item.id);

    dispatch(postOrderAction({
      camerasIds: camerasIds,
      coupon: coupon === '' ? null : coupon
    }));
  };

  const discountSum = Math.floor(summaryValue * discount / 100);
  const getClassName = () => cn('basket__summary-value', {
    ' basket__summary-value--bonus': discountSum !== 0
  });

  return (
    <section className="basket">
      <div className="container">
        <h1 className="title title--h2">Корзина</h1>
        <ul className="basket__list">
          {camerasInBasket.map((item, idx) => (
            <BasketItem camerasInBasket={camerasInBasket} camera={item.camera} key={item.camera.name} amount={item.amount} idx={idx}/>
          ))}
        </ul>
        <div className="basket__summary">
          <BasketPromo />
          <div className="basket__summary-order">
            <p className="basket__summary-item">
              <span className="basket__summary-text">Всего:</span>
              <span className="basket__summary-value">{summaryValue}  ₽</span>
            </p>
            <p className="basket__summary-item">
              <span className="basket__summary-text">Скидка:</span>
              <span className={getClassName()}>{discountSum} ₽</span>
            </p>
            <p className="basket__summary-item">
              <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
              <span className="basket__summary-value basket__summary-value--total">{summaryValue - discountSum} ₽</span>
            </p>
            <button
              className="btn btn--purple"
              type="submit"
              onClick={handleBasketClick}
              disabled={orderPostStatus === FetchStatus.Loading || camerasInBasket.length === 0}
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
