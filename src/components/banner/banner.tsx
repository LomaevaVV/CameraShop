import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Promo } from '../../types/promo';

type BannerProps = {
  promo: Promo;
}

export default function Banner ({promo}: BannerProps): JSX.Element {
  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`${AppRoute.Main}${promo.previewImgWebp}, ${AppRoute.Main}${promo.previewImgWebp2x} 2x`} />
        <img src={`${AppRoute.Main}${promo.previewImg}`} srcSet={`${AppRoute.Main}${promo.previewImg2x} 2x`} width="1280" height="280" alt="баннер" />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{promo.name}</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to={generatePath(AppRoute.Product, {id: String(promo.id)})}>Подробнее</Link>
      </p>
    </div>
  );
}
