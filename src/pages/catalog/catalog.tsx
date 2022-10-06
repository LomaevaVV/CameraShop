import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Banner from '../../components/banner/banner';
import PageContent from '../../components/page-content/page-content';

export default function Catalog(): JSX.Element {

  return (
    <div className="wrapper">
      <Header />

      <main>
        <Banner />
        <PageContent />
      </main>

      <Footer />
    </div>
  );
}
