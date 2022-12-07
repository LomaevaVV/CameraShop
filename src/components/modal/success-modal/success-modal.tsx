import { ModalState } from '../../../const';

type SuccessModalProps = {
  onClick: () => void;
  modalState: string;
}

export default function SuccessModal({onClick, modalState}: SuccessModalProps): JSX.Element {
  return (
    <div className="modal__content">
      <p className="title title--h4">
        {modalState === ModalState.ReviewSuccess && 'Спасибо за отзыв'}
        {modalState === ModalState.AddBasketSuccess && 'Спасибо за покупку'}
      </p>
      <svg className="modal__icon" width="80" height="78" aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <button autoFocus onClick={onClick} className="btn btn--purple modal__btn modal__btn--fit-width" type="button">Вернуться к покупкам
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
