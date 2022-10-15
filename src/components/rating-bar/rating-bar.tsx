type RatingBarProps = {
  rating: number;
  reviewCount?: number;
  ratingBarClassName: string;
}

export default function RatingBar ({rating, reviewCount, ratingBarClassName}: RatingBarProps): JSX.Element {
  const ratingBar = [1, 2, 3, 4, 5];

  return (

    <div className={`rate ${ratingBarClassName}__rate`}>
      {ratingBar.map((item) => {
        if (item <= rating) {
          return (
            <svg key={item} width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
          );
        }
        else { return (
          <svg key={item} width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>);
        }
      })}
      <p className="visually-hidden">Рейтинг: {rating}</p>
      {reviewCount &&
        <p className="rate__count">
          <span className="visually-hidden">Всего оценок:
          </span>
          {reviewCount}
        </p>}
    </div>
  );
}