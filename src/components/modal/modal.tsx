import { ModalState } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeModalState } from '../../store/app-process/app-process';
import { getSelectedCamera } from '../../store/app-process/selectors';
import { getProduct } from '../../store/cameras/selectors';
import { Camera } from '../../types/camera';
import cn from 'classnames';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';
import BasketModal from './basket-modal/basket-modal';
import SuccessReview from './review-success/review-success';
import ReviewModal from './review-modal/review-modal';
import BasketSuccess from './basket-success/basket-success';
import OrderSuccess from './order-success/order-success';

type ModalProps = {
  modalState: string;
}

export default function Modal({modalState}: ModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const selectidCard: Camera | undefined = useAppSelector(getSelectedCamera);
  const camera: Camera | undefined = useAppSelector(getProduct);

  const handleClickCloseButton = () => {
    dispatch(changeModalState(ModalState.Closed));
  };

  const handleEscPress = (evt: KeyboardEvent) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      dispatch(changeModalState(ModalState.Closed));
    }
  };

  document.addEventListener('keydown', handleEscPress);

  const getClassName = () => cn('modal is-active', {
    'modal--narrow': modalState === ModalState.ReviewSuccess
  });

  return (
    <FocusLock>
      <RemoveScroll enabled>
        <div className={getClassName()} >
          <div className="modal__wrapper" data-testid="modal">
            <div className="modal__overlay" onClick={() => dispatch(changeModalState(ModalState.Closed))}></div>
            {(modalState === ModalState.BasketAddItem
              || modalState === ModalState.BasketDelItem)
              && selectidCard
              && <BasketModal modalState={modalState} camera={selectidCard} onClick={handleClickCloseButton}/>}

            {modalState === ModalState.ReviewForm
              && camera
              && <ReviewModal cameraId={camera.id} onClick={handleClickCloseButton}/>}

            {modalState === ModalState.ReviewSuccess
              && <SuccessReview onClick={handleClickCloseButton}/>}

            {modalState === ModalState.BasketSuccess
              && <BasketSuccess onClick={handleClickCloseButton}/>}

            {modalState === ModalState.OrderSuccess
              && <OrderSuccess onClick={handleClickCloseButton}/>}

          </div>
        </div>
      </RemoveScroll>
    </FocusLock>
  );
}
