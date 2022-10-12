
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PageContent from '../../components/page-content/page-content';
import Product from '../../components/product/product';
import ProductSimilar from '../../components/product-similar/product-similar';
import ReviwBlock from '../../components/review-block/review-block';


export default function ProductPage(): JSX.Element {

  return (
    <div className="wrapper">
      <Header />

      <main>
        <PageContent>
          <Product />
          <ProductSimilar />
          <ReviwBlock />
        </PageContent>
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>

      <Footer />
    </div>
  );
}
