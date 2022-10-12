import { HOST_URL } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeModalActive, setSelectedCamera } from '../../store/app-process/app-process';
import { Camera } from '../../types/camera';

type ModalProps = {
  camera: Camera;
}

export default function Modal({camera}: ModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const HandleClickCloseButton = () => {
    dispatch(setSelectedCamera(undefined));
    dispatch(changeModalActive(false));
  };

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`${HOST_URL}/${camera.previewImgWebp}, ${HOST_URL}/${camera.previewImgWebp2x} 2x`} />
                <img src={`${HOST_URL}/${camera.previewImg}`} srcSet={`${HOST_URL}/${camera.previewImg2x} 2x`} width="140" height="120" alt="Фотоаппарат «Орлёнок»" />
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
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
          </div>
          <button
            onClick={HandleClickCloseButton}
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
