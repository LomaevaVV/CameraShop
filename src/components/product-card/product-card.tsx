import { Link } from 'react-router-dom';
import { Camera } from '../../types/camera';
import RatingBar from '../rating-bar/rating-bar';

type ProductCardProps = {
  camera: Camera;
}

export default function ProductCard ({camera}: ProductCardProps): JSX.Element {

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} />
          <img src={`${camera.previewImg}`} srcSet={`${camera.previewImg2x} 2x`} width="280" height="240" alt={camera.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <RatingBar rating={camera.rating} reviewCount={camera.reviewCount}/>
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{camera.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link className="btn btn--transparent" to="#">Подробнее
        </Link>
      </div>
    </div>
  );
}
