import Header from '../../components/header/header';
import PageContent from '../../components/page-content/page-content';
import Footer from '../../components/footer/footer';
import Basket from '../../components/basket/basket';
import { useAppSelector } from '../../hooks';
import { getModalState } from '../../store/app-process/selectors';
import { ModalState } from '../../const';
import Modal from '../../components/modal/modal';

export default function BasketPage(): JSX.Element {
  const modalState: string = useAppSelector(getModalState);

  return (
    <div className="wrapper">
      <Header />

      <main>
        <PageContent>
          <Basket />
        </PageContent>
        {modalState !== ModalState.Closed && <Modal modalState={modalState}/>}
      </main>

      <Footer />
    </div>
  );
}
