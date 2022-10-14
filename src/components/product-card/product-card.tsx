import { generatePath, Link } from 'react-router-dom';
import { AppRoute, ClassName, HOST_URL } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeModalActive, setSelectedCamera } from '../../store/app-process/app-process';
import { Camera } from '../../types/camera';
import RatingBar from '../rating-bar/rating-bar';
import cn from 'classnames';

type ProductCardProps = {
  camera: Camera;
  isActive?: boolean;
}

export default function ProductCard ({camera, isActive}: ProductCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const HandleClickBuyButton = () => {
    dispatch(setSelectedCamera(camera));
    dispatch(changeModalActive(true));
  };

  const getCardClassName = () :string=> cn('product-card', {
    'is-active': isActive
  });

  return (
    <div className={getCardClassName()}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${HOST_URL}/${camera.previewImgWebp}, ${HOST_URL}/${camera.previewImgWebp2x} 2x`} />
          <img src={`${HOST_URL}/${camera.previewImg}`} srcSet={`${HOST_URL}/${camera.previewImg2x} 2x`} width="280" height="240" alt={camera.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <RatingBar rating={camera.rating} reviewCount={camera.reviewCount} ratingBarClassName={ClassName.ProductCard}/>
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{camera.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          onClick={HandleClickBuyButton}
          className="btn btn--purple product-card__btn"
          type="button"
        >
          Купить
        </button>
        <Link className="btn btn--transparent" to={generatePath(AppRoute.Product, {id: String(camera.id)})}>Подробнее
        </Link>
      </div>
    </div>
  );
}
