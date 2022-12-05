
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PageContent from '../../components/page-content/page-content';
import Product from '../../components/product/product';
import ProductSimilar from '../../components/product-similar/product-similar';
import ReviwBlock from '../../components/review-block/review-block';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProductAction, fetchReviewsAction, fetchSimilarAction } from '../../store/api-actions';
import { getProduct, getProductFetchStatus, getSimilar } from '../../store/cameras/selectors';
import { Camera } from '../../types/camera';
import Modal from '../../components/modal/modal';
import { getReviews } from '../../store/reviews/selectors';
import { getModalState } from '../../store/app-process/selectors';
import { FetchStatus, ModalState } from '../../const';
import Loader from '../../components/loader/loader';
import NotFoundPage from '../not-found-page/not-found-page';
import { scrollToTop } from '../../utils';


export default function ProductPage(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductAction(Number(id)));
    dispatch(fetchSimilarAction(Number(id)));
    dispatch(fetchReviewsAction(Number(id)));
  }, [dispatch, id]);

  const productFetchStatus = useAppSelector(getProductFetchStatus);
  const camera: Camera | undefined = useAppSelector(getProduct);
  const similar = useAppSelector(getSimilar);
  const reviews = useAppSelector(getReviews);
  const modalState: string = useAppSelector(getModalState);

  if (
    productFetchStatus === FetchStatus.Idle ||
    productFetchStatus === FetchStatus.Loading
  ) {
    return <Loader />;
  }

  if (!camera || productFetchStatus === FetchStatus.Rejected) {
    return (<NotFoundPage />);
  }

  return (
    <div className="wrapper">
      <Header />

      <main>
        <PageContent>
          {camera && <Product camera={camera}/>}
          {similar.length > 0 && <ProductSimilar cameras={similar}/>}
          <ReviwBlock reviews={reviews}/>
        </PageContent>
        {modalState !== ModalState.Closed && <Modal modalState={modalState}/>}
      </main>
      <button type="button" className="up-btn" onClick={() => scrollToTop(0)}>
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </button>

      <Footer />
    </div>
  );
}
