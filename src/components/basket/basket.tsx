import { getCamerasInBasket } from '../../store/cameras/selectors';
import { useAppSelector } from '../../hooks/index';
import BasketItem from './basket-item';
import BasketPromo from './basket-promo';
import { getDiscount } from '../../store/coupons/selectors';
import { getBasketValue } from '../../store/app-process/selectors';

export default function Basket(): JSX.Element {

  const camerasInBasket = useAppSelector(getCamerasInBasket);
  const summaryValue = useAppSelector(getBasketValue);
  const discount = useAppSelector(getDiscount);

  const getDiscountSum = summaryValue * discount / 100;

  return (
    <section className="basket">
      <div className="container">
        <h1 className="title title--h2">Корзина</h1>
        <ul className="basket__list">
          {camerasInBasket.map((item) => (
            <BasketItem camera={item.camera} key={item.id} amount={item.amount}/>
          ))}
        </ul>
        <div className="basket__summary">
          <BasketPromo />
          <div className="basket__summary-order">
            <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{summaryValue}  ₽</span></p>
            <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">{getDiscountSum} ₽</span></p>
            <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{summaryValue - getDiscountSum} ₽</span></p>
            <button
              className="btn btn--purple"
              type="submit"
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
