import { ChangeEvent, useState } from 'react';
import { AppRoute, ModalState } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeModalState, setSelectedCamera } from '../../store/app-process/app-process';
import { setCamerasInBasket } from '../../store/cameras/cameras';
import { Camera, CamerasInBasket } from '../../types/camera';

type BasketItemProps = {
  camera: Camera;
  amount: number;
  idx: number;
  camerasInBasket: CamerasInBasket;
}

export default function BasketItem({camerasInBasket, camera, amount, idx}: BasketItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [carrentAmount, setCarrentAmount] = useState(amount);

  const handleRemoveBtnClick = () => {
    dispatch(changeModalState(ModalState.DelFromBasket));
    dispatch(setSelectedCamera(camera));
  };

  const updateCamerasInBasket = (newAmount: number) => {
    setCarrentAmount(newAmount);
    dispatch(setCamerasInBasket(
      [...camerasInBasket.slice(0, idx),
        {
          id: camera.id,
          amount: newAmount,
          camera: camera},
        ...camerasInBasket.slice(idx + 1, camerasInBasket.length)]));
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    evt.preventDefault();
    const {value} = evt.target;

    setCarrentAmount(Number(value));
  };

  const handleInputBlure = () => {
    carrentAmount >= 1
      && carrentAmount <= 99
      && carrentAmount !== amount
      && updateCamerasInBasket(carrentAmount);

    (carrentAmount < 1
      || carrentAmount > 99)
      && setCarrentAmount(amount);
  };

  const handlePrevBtnClick = () => {
    updateCamerasInBasket(carrentAmount - 1);
  };

  const handleNextBtnClick = () => {
    updateCamerasInBasket(carrentAmount + 1);
  };

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`${AppRoute.Main}${camera.previewImgWebp}, ${AppRoute.Main}${camera.previewImgWebp2x} 2x`} />
          <img src={`${AppRoute.Main}${camera.previewImg}`} srcSet={`${AppRoute.Main}${camera.previewImg2x} 2x`} width="140" height="120" alt={camera.name} />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{camera.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{camera.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{camera.type} {camera.category}</li>
          <li className="basket-item__list-item">{camera.level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{camera.price} ₽</p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={handlePrevBtnClick}
          disabled={carrentAmount <= 1}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input
          onBlur={handleInputBlure}
          onChange={handleInputChange}
          type="number"
          id="counter1"
          value={carrentAmount}
          min="1"
          max="99"
          aria-label="количество товара"
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={handleNextBtnClick}
          disabled={carrentAmount >= 99}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{camera.price * amount} ₽</div>
      <button
        onClick={handleRemoveBtnClick}
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}
