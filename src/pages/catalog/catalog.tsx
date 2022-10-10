import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Banner from '../../components/banner/banner';
import PageContent from '../../components/page-content/page-content';
import { useAppSelector } from '../../hooks';
import { getPromo } from '../../store/promo/selectors';

export default function Catalog(): JSX.Element {
  const promo = useAppSelector(getPromo);

  return (
    <div className="wrapper">
      <Header />

      <main>
        {promo !== null && <Banner promo={promo}/>}
        <PageContent />
      </main>

      <Footer />
    </div>
  );
}
