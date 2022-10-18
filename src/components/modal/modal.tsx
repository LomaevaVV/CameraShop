import { ModalState } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeModalState } from '../../store/app-process/app-process';
import { Camera } from '../../types/camera';
import AddBasketModal from './add-basket-modal';
import AddReviewModal from './add-review-modal';

type ModalProps = {
  camera: Camera | undefined;
  modalState: string;
}

export default function Modal({camera, modalState}: ModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClickCloseButton = () => {
    dispatch(changeModalState(ModalState.Closed));
    document.body.style.overflow = 'unset';
  };

  const handleEscPress = () => {
    dispatch(changeModalState(ModalState.Closed));
    document.body.style.overflow = 'unset';
  };

  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleEscPress);

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        {modalState === ModalState.AddBasket
          ? camera && <AddBasketModal camera={camera} onClick={handleClickCloseButton}/>
          : <AddReviewModal onClick={handleClickCloseButton}/>}
      </div>
    </div>
  );
}
