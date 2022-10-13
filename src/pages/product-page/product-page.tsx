
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PageContent from '../../components/page-content/page-content';
import Product from '../../components/product/product';
import ProductSimilar from '../../components/product-similar/product-similar';
import ReviwBlock from '../../components/review-block/review-block';
import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProductAction } from '../../store/api-actions';
import { getProduct, getProductFetchStatus } from '../../store/cameras/selectors';
import { Camera } from '../../types/camera';


export default function ProductPage(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!isRenderedRef.current) {
      dispatch(fetchProductAction(Number(id)));
      isRenderedRef.current = true;
    }
  }, [dispatch, id]);

  const prosuctFetchStatus = useAppSelector(getProductFetchStatus);
  const camera: Camera | undefined = useAppSelector(getProduct);

  window.console.log(prosuctFetchStatus, camera);

  return (
    <div className="wrapper">
      <Header />

      <main>
        <PageContent>
          {camera && <Product camera={camera}/>}
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
