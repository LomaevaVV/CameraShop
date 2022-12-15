import { FormEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { postDiscountByCoupon } from '../../store/api-actions';

export default function BasketPromo(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleSubmitClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(postDiscountByCoupon('camera-333'));
  };

  return (
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
          <button
            onClick={handleSubmitClick}
            className="btn"
          >
            Применить
          </button>
        </form>
      </div>
    </div>
  );
}
