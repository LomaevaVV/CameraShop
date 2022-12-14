import { getCamerasInBasket } from '../../store/cameras/selectors';
import { useAppSelector } from '../../hooks/index';
import BasketItem from './basket-item';

export default function Basket(): JSX.Element {
  const camerasInBasket = useAppSelector(getCamerasInBasket);
  const uniqCamerasInBasket = [...new Set(camerasInBasket)];
  window.console.log(camerasInBasket, uniqCamerasInBasket);

  const getSummaryValue = () => {
    let sum = 0;
    camerasInBasket.forEach((item) => (sum += item.camera.price * item.amount));
    return sum;
  };

  getSummaryValue();

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
          <div className="basket__promo">
            <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
            <div className="basket-form">
              <form action="#">
                <div className="custom-input">
                  <label><span className="custom-input__label">Промокод</span>
                    <input type="text" name="promo" placeholder="Введите промокод" />
                  </label>
                  <p className="custom-input__error">Промокод неверный</p>
                  <p className="custom-input__success">Промокод принят!</p>
                </div>
                <button className="btn" type="submit">Применить
                </button>
              </form>
            </div>
          </div>
          <div className="basket__summary-order">
            <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{getSummaryValue()}  ₽</span></p>
            <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
            <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{getSummaryValue()} ₽</span></p>
            <button className="btn btn--purple" type="submit">Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
