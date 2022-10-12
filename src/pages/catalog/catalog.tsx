import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Banner from '../../components/banner/banner';
import PageContent from '../../components/page-content/page-content';
import { useAppSelector } from '../../hooks';
import { getPromo } from '../../store/promo/selectors';
import Modal from '../../components/modal/modal';
import { getModalActive, getSelectedCamera } from '../../store/app-process/selectors';
import { Camera } from '../../types/camera';


export default function Catalog(): JSX.Element {
  const promo = useAppSelector(getPromo);
  const isModalActive = useAppSelector(getModalActive);
  const selectidCard: Camera | undefined = useAppSelector(getSelectedCamera);

  return (
    <div className="wrapper">
      <Header />

      <main>
        {promo !== null && <Banner promo={promo}/>}
        <PageContent />
        {isModalActive && selectidCard && <Modal camera={selectidCard}/>}
      </main>

      <Footer />
    </div>
  );
}
