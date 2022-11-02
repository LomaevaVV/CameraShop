import { AppRoute } from '../../const';
import { Camera } from '../../types/camera';

type addBasketModalProps = {
  camera: Camera;
  onClick: () => void;
}

export default function AddBasketModal({camera, onClick}: addBasketModalProps): JSX.Element {
  return (
    <div className="modal__content">
      <p className="title title--h4">Добавить товар в корзину</p>
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
      <div className="modal__buttons">
        <button autoFocus className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
          <svg width="24" height="16" aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>Добавить в корзину
        </button>
      </div>
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
