import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Banner from '../../components/banner/banner';
import PageContent from '../../components/page-content/page-content';
import { useAppSelector } from '../../hooks';
import { getPromo } from '../../store/promo/selectors';
import Modal from '../../components/modal/modal';
import Catalog from '../../components/catalog/catalog';
import { ModalState } from '../../const';
import { getModalState } from '../../store/app-process/selectors';


export default function CatalogPage(): JSX.Element {
  const promo = useAppSelector(getPromo);
  const modalState: string = useAppSelector(getModalState);

  return (
    <div className="wrapper">
      <Header />

      <main>
        {promo !== null && <Banner promo={promo}/>}
        <PageContent>
          <Catalog />
        </PageContent>
        {modalState !== ModalState.Closed && <Modal modalState={modalState}/>}
      </main>

      <Footer />
    </div>
  );
}
