import { ClassName } from '../../const';
import { Review } from '../../types/review';
import RatingBar from '../rating-bar/rating-bar';

type ReviwCardProps = {
  review: Review;
}

export default function ReviwCard({review}: ReviwCardProps): JSX.Element {

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime="2022-04-13">{review.createAt}</time>
      </div>
      <RatingBar
        rating={review.rating}
        ratingBarClassName={ClassName.ReviewCard}
      />
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review.review}</p>
        </li>
      </ul>
    </li>
  );
}
