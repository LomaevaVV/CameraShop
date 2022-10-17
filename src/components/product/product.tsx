import { ClassName, HOST_URL, ProductTubs } from '../../const';
import { Camera } from '../../types/camera';
import RatingBar from '../rating-bar/rating-bar';
import cn from 'classnames';
import { useEffect, useState } from 'react';

type ProductProps = {
  camera: Camera;
}

export default function Product({camera}: ProductProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(ProductTubs.Features);

  useEffect(() => {
    setActiveTab(ProductTubs.Features);
  }, [camera]);

  const getClassName = (className: string, tabName: string) => cn(className, {
    'is-active': activeTab === tabName
  });

  return (
    <div className="page-content__section">
      <section className="product">
        <div className="container">
          <div className="product__img">
            <picture>
              <source type="image/webp" srcSet={`${HOST_URL}/${camera.previewImgWebp}, ${HOST_URL}/${camera.previewImgWebp2x} 2x`} />
              <img src={`${HOST_URL}/${camera.previewImg}`} srcSet={`${HOST_URL}/${camera.previewImg2x} 2x`} width="560" height="480" alt="Ретрокамера Das Auge IV" />
            </picture>
          </div>
          <div className="product__content">
            <h1 className="title title--h3">{camera.name}</h1>
            <RatingBar rating={camera.rating} reviewCount={camera.reviewCount} ratingBarClassName={ClassName.Product}/>
            <p className="product__price"><span className="visually-hidden">Цена:</span>{camera.price} ₽</p>
            <button className="btn btn--purple" type="button">
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
            <div className="tabs product__tabs">
              <div className="tabs__controls product__tabs-controls">
                <button
                  onClick={() => setActiveTab(ProductTubs.Features)}
                  className={getClassName('tabs__control', ProductTubs.Features)}
                  type="button"
                >
                  Характеристики
                </button>
                <button
                  onClick={() => setActiveTab(ProductTubs.Description)}
                  className={getClassName('tabs__control', ProductTubs.Description)}
                  type="button"
                >
                  Описание
                </button>
              </div>
              <div className="tabs__content">
                <div className={getClassName('tabs__element', ProductTubs.Features)}>
                  <ul className="product__tabs-list">
                    <li className="item-list"><span className="item-list__title">Артикул:</span>
                      <p className="item-list__text"> {camera.vendorCode}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Категория:</span>
                      <p className="item-list__text">{camera.category}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                      <p className="item-list__text">{camera.type}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Уровень:</span>
                      <p className="item-list__text">{camera.level}</p>
                    </li>
                  </ul>
                </div>
                <div className={getClassName('tabs__element', ProductTubs.Description)}>
                  <div className="product__tabs-text">
                    <p>{camera.description}</p>
                    <p>Вы&nbsp;тоже можете прикоснуться к&nbsp;волшебству аналоговой съёмки, заказав этот чудо-аппарат. Кто знает, может с&nbsp;{camera.name}&nbsp;начнётся ваш путь к&nbsp;наградам всех престижных кинофестивалей.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
