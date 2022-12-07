import Header from '../../components/header/header';
import PageContent from '../../components/page-content/page-content';
import Footer from '../../components/footer/footer';
import Basket from '../../components/basket/basket';

export default function BasketPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />

      <main>
        <PageContent>
          <Basket />
        </PageContent>
      </main>

      <Footer />
    </div>
  );
}
