import { generatePath, Link } from 'react-router-dom';
import { AppRoute, ClassName, ModalState } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeModalState, setSelectedCamera } from '../../store/app-process/app-process';
import { Camera, CamerasInBasket } from '../../types/camera';
import RatingBar from '../rating-bar/rating-bar';
import cn from 'classnames';
import { getCamerasInBasket } from '../../store/cameras/selectors';

type ProductCardProps = {
  camera: Camera;
  isActive?: boolean;
}

export default function ProductCard ({camera, isActive}: ProductCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const camerasInBasket: CamerasInBasket = useAppSelector(getCamerasInBasket);
  const cameraInBasket = camerasInBasket.filter((item) => item.id === camera.id);

  const HandleClickBuyButton = () => {
    dispatch(setSelectedCamera(camera));
    dispatch(changeModalState(ModalState.AddBasket));
  };

  const getBuyButton = () => cameraInBasket.length > 0
    ?
    <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to="#">
      <svg width="16" height="16" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>В корзине
    </Link>
    :
    <button
      onClick={HandleClickBuyButton}
      className="btn btn--purple product-card__btn"
      type="button"
    >
      Купить
    </button>;

  const getCardClassName = () :string=> cn('product-card', {
    'is-active': isActive
  });

  return (
    <div className={getCardClassName()}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${AppRoute.Main}${camera.previewImgWebp}, ${AppRoute.Main}${camera.previewImgWebp2x} 2x`} />
          <img src={`${AppRoute.Main}${camera.previewImg}`} srcSet={`${AppRoute.Main}${camera.previewImg2x} 2x`} width="280" height="240" alt={camera.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <RatingBar rating={camera.rating} reviewCount={camera.reviewCount} ratingBarClassName={ClassName.ProductCard}/>
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{camera.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {getBuyButton()}
        <Link className="btn btn--transparent" to={generatePath(AppRoute.Product, {id: String(camera.id)})}>Подробнее
        </Link>
      </div>
    </div>
  );
}
