import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ModalState, MORE_REVIEWS_STEP, SCROLL_TIMEOUT } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeModalState, setReviewsAmount } from '../../store/app-process/app-process';
import { getReviewsAmount, getReviewsOnPage } from '../../store/app-process/selectors';
import { Reviews } from '../../types/review';
import { debounce } from '../../utils';
import ReviwCard from './review-card';

type ReviwBlockProps = {
  reviews: Reviews;
}

export default function ReviwBlock({reviews}: ReviwBlockProps): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setReviewsAmount(MORE_REVIEWS_STEP));
  }, [dispatch, id]);

  const reviewsAmount = useAppSelector(getReviewsAmount);
  const reviewsOnPage = useAppSelector(getReviewsOnPage);

  const HandleClickNewReviewBtn = () => {
    dispatch(changeModalState(ModalState.AddReview));
  };

  const handleMoreReviewsBtnClick = () => {
    dispatch(setReviewsAmount(reviewsAmount + MORE_REVIEWS_STEP));
  };

  const handleWindowScroll = debounce(() => {
    if (window.scrollY + 1 > document.documentElement.scrollHeight - document.documentElement.clientHeight) {
      dispatch(setReviewsAmount(reviewsAmount + MORE_REVIEWS_STEP));
    }
  }, SCROLL_TIMEOUT);

  useEffect(() => {
    if (!reviewsOnPage.includes(reviews[reviews.length - 1])) {
      window.addEventListener('scroll', handleWindowScroll);

      return () => {
        window.removeEventListener('scroll', handleWindowScroll);
      };
    }}, [handleWindowScroll, reviews, reviewsOnPage]);

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button
              onClick={HandleClickNewReviewBtn}
              className="btn"
              type="button"
            >
              Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list">
            {reviewsOnPage.map((item) => (
              <ReviwCard
                key={item.id}
                review={item}
              />
            ))}
          </ul>
          <div className="review-block__buttons">
            <button
              onClick={handleMoreReviewsBtnClick}
              className="btn btn--purple"
              type="button"
              disabled = {reviewsOnPage.includes(reviews[reviews.length - 1])}
            >
              Показать больше отзывов
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
