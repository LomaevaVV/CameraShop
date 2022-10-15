import { ModalState } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeModalState } from '../../store/app-process/app-process';
import { Reviews } from '../../types/review';
import ReviwCard from './review-card';

type ReviwBlockProps = {
  reviews: Reviews;
}

export default function ReviwBlock({reviews}: ReviwBlockProps): JSX.Element {
  const reviewsActive = reviews.slice(0, 3);
  const dispatch = useAppDispatch();

  const HandleClickNewReviewBtn = () => {
    dispatch(changeModalState(ModalState.AddReview));
  };

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
            {reviewsActive.map((item) => (
              <ReviwCard
                key={item.id}
                review={item}
              />
            ))}
          </ul>
          <div className="review-block__buttons">
            <button className="btn btn--purple" type="button">Показать больше отзывов
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
