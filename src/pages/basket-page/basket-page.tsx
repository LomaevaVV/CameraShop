import Header from '../../components/header/header';
import PageContent from '../../components/page-content/page-content';
import Footer from '../../components/footer/footer';
import Basket from '../../components/basket/basket';
import { useAppSelector } from '../../hooks';
import { getModalState } from '../../store/app-process/selectors';
import { FetchStatus, ModalState } from '../../const';
import Modal from '../../components/modal/modal';
import { getOrderPostStatus } from '../../store/order/selectors';
import BasketError from '../../components/basket-error/basket-error';

export default function BasketPage(): JSX.Element {
  const modalState: string = useAppSelector(getModalState);
  const postOrderActionStatus: string = useAppSelector(getOrderPostStatus);

  return (
    <div className="wrapper">
      <Header />

      <main>
        <PageContent>
          {postOrderActionStatus === FetchStatus.Rejected
            ? <BasketError />
            : <Basket />}
        </PageContent>
        {modalState !== ModalState.Closed && <Modal modalState={modalState}/>}
      </main>

      <Footer />
    </div>
  );
}
