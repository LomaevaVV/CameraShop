import { Link } from 'react-router-dom';
import { AppRoute, ModalState } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { changeModalState } from '../../../store/app-process/app-process';
import { setCamerasInBasket } from '../../../store/cameras/cameras';
import { getCamerasInBasket } from '../../../store/cameras/selectors';
import { Camera, CamerasInBasket } from '../../../types/camera';

type basketModalProps = {
  camera: Camera;
  onClick: () => void;
  modalState: string;
}

export default function BasketModal({camera, onClick, modalState}: basketModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const camerasInBasket: CamerasInBasket = useAppSelector(getCamerasInBasket);

  const handleAddBasketBtnClick = () => {
    const cameraInBasket = camerasInBasket.filter((item) => item.id === camera.id);
    if (cameraInBasket.length !== 0) {
      dispatch(setCamerasInBasket([
        ...camerasInBasket.filter((item) => item.id !== camera.id),
        {
          id: camera.id,
          amount: cameraInBasket[0].amount + 1,
          camera: camera,
        }]));
    }

    if (cameraInBasket.length === 0) {
      dispatch(setCamerasInBasket([
        ...camerasInBasket,
        {
          id: camera.id,
          amount: 1,
          camera: camera,
        }]));
    }

    dispatch(changeModalState(ModalState.AddBasketSuccess));
  };

  const handleDelBasketBtnClick = () => {
    dispatch(setCamerasInBasket([...camerasInBasket.filter((item) => item.id !== camera.id)]));

    dispatch(changeModalState(ModalState.AddBasketSuccess));
  };

  return (
    <div className="modal__content">
      <p className="title title--h4">
        {modalState === ModalState.AddBasket
          ? 'Добавить товар в корзину'
          : 'Удалить этот товар?' }
      </p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet={`${AppRoute.Main}${camera.previewImgWebp}, ${AppRoute.Main}${camera.previewImgWebp2x} 2x`} />
            <img src={`${AppRoute.Main}${camera.previewImg}`} srcSet={`${AppRoute.Main}${camera.previewImg2x} 2x`} width="140" height="120" alt="Фотоаппарат «Орлёнок»" />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{camera.name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул:</span>
              <span className="basket-item__number">{camera.vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{camera.category}</li>
            <li className="basket-item__list-item">{camera.level} уровень</li>
          </ul>
          <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{camera.price} ₽</p>
        </div>
      </div>
      {modalState === ModalState.AddBasket
        ?
        <div className="modal__buttons">
          <button autoFocus
            className="btn btn--purple modal__btn modal__btn--fit-width"
            type="button"
            onClick={handleAddBasketBtnClick}
          >
            <svg width="24" height="16" aria-hidden="true">
              <use xlinkHref="#icon-add-basket"></use>
            </svg>Добавить в корзину
          </button>
        </div>
        :
        <div className="modal__buttons">
          <button
            className="btn btn--purple modal__btn modal__btn--half-width"
            type="button"
            onClick={handleDelBasketBtnClick}
          >
            Удалить
          </button>
          <Link className="btn btn--transparent modal__btn modal__btn--half-width" to="#">
            Продолжить покупки
          </Link>
        </div>}
      <button
        onClick={onClick}
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </div>
  );
}
