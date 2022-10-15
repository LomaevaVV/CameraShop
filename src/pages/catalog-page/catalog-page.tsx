import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Banner from '../../components/banner/banner';
import PageContent from '../../components/page-content/page-content';
import { useAppSelector } from '../../hooks';
import { getPromo } from '../../store/promo/selectors';
import Modal from '../../components/modal/modal';
import { getModalState, getSelectedCamera } from '../../store/app-process/selectors';
import { Camera } from '../../types/camera';
import Catalog from '../../components/catalog/catalog';
import { ModalState } from '../../const';


export default function CatalogPage(): JSX.Element {
  const promo = useAppSelector(getPromo);
  const modalState = useAppSelector(getModalState);
  const selectidCard: Camera | undefined = useAppSelector(getSelectedCamera);

  return (
    <div className="wrapper">
      <Header />

      <main>
        {promo !== null && <Banner promo={promo}/>}
        <PageContent>
          <Catalog />
        </PageContent>
        {modalState !== ModalState.Closed && <Modal camera={selectidCard} modalState={modalState}/>}
      </main>

      <Footer />
    </div>
  );
}
