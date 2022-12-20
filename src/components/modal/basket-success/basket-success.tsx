import { Link } from 'react-router-dom';
import { AppRoute, ModalState } from '../../../const';
import { useAppDispatch } from '../../../hooks';
import { redirectToRoute } from '../../../store/action';
import { changeModalState } from '../../../store/app-process/app-process';

type BasketSuccessProps = {
  onClick: () => void;
}

export default function BasketSuccess({onClick}: BasketSuccessProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleToBasketClick = () => {
    dispatch(redirectToRoute(AppRoute.Basket));
    dispatch(changeModalState(ModalState.Closed));
  };

  return (
    <div className="modal__content">
      <p className="title title--h4">
        Товар успешно добавлен в корзину
      </p>
      <svg
        className="modal__icon"
        width='86'
        height='80'
        aria-hidden="true"
      >
        <use
          xlinkHref='#icon-success'
        >
        </use>
      </svg>
      <div className="modal__buttons">
        <Link
          className="btn btn--transparent modal__btn"
          to="#"
          onClick={onClick}
        >
          Продолжить покупки
        </Link>
        <button
          onClick={handleToBasketClick}
          autoFocus
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
        >
          Перейти в корзину
        </button>
      </div>
      <button onClick={onClick} className="cross-btn" type="button" aria-label="Закрыть попап">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </div>
  );
}
