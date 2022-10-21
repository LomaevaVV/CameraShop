import { ModalState } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeModalState } from '../../store/app-process/app-process';
import { getSelectedCamera } from '../../store/app-process/selectors';
import { getProduct } from '../../store/cameras/selectors';
import { Camera } from '../../types/camera';
import AddBasketModal from './add-basket-modal';
import AddReviewModal from './add-review-modal';
import ReviewSuccess from './review-success';
import cn from 'classnames';

type ModalProps = {
  modalState: string;
}

export default function Modal({modalState}: ModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const selectidCard: Camera | undefined = useAppSelector(getSelectedCamera);
  const camera: Camera | undefined = useAppSelector(getProduct);

  const handleClickCloseButton = () => {
    dispatch(changeModalState(ModalState.Closed));
    document.body.style.overflow = 'unset';
  };

  const handleEscPress = (evt: KeyboardEvent) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      dispatch(changeModalState(ModalState.Closed));
      document.body.style.overflow = 'unset';
    }
  };

  document.body.style.overflow = 'hidden';

  document.addEventListener('keydown', handleEscPress);

  const getClassName = () => cn('modal is-active', {
    'modal--narrow': modalState === ModalState.ReviewSuccess
  });

  return (
    <div className={getClassName()}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        {modalState === ModalState.AddBasket
          && selectidCard
          && <AddBasketModal camera={selectidCard} onClick={handleClickCloseButton}/>}

        {modalState === ModalState.AddReview
          && camera
          && <AddReviewModal cameraId={camera.id} onClick={handleClickCloseButton}/>}

        {modalState === ModalState.ReviewSuccess
          && <ReviewSuccess onClick={handleClickCloseButton}/>}
      </div>
    </div>
  );
}
