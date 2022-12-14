import { useState } from 'react';
import { MAX_CARDS_ON_SLIDER } from '../../const';
import { Cameras } from '../../types/camera';
import ProductCard from '../product-card/product-card';

type ProductSimilarProps = {
  cameras: Cameras;
}

export default function ProductSimilar({cameras}: ProductSimilarProps): JSX.Element {
  const [firstCardIdx, setFirstCardIdx] = useState(0);

  let camerasOnSlider = cameras.slice(firstCardIdx, firstCardIdx + MAX_CARDS_ON_SLIDER);

  const handleSliderNextClick = () => {
    setFirstCardIdx(firstCardIdx + 1);
    camerasOnSlider = cameras.slice(firstCardIdx, firstCardIdx + MAX_CARDS_ON_SLIDER);
  };

  const handleSliderPrevClick = () => {
    setFirstCardIdx(firstCardIdx - 1);
    camerasOnSlider = cameras.slice(firstCardIdx, firstCardIdx + MAX_CARDS_ON_SLIDER);
  };

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {camerasOnSlider.map((item) => (
                <ProductCard
                  key={item.id}
                  camera={item}
                  isActive={camerasOnSlider.includes(item)}
                />
              ))}
            </div>
            <button
              onClick={handleSliderPrevClick}
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              disabled={camerasOnSlider.includes(cameras[0])}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
              onClick={handleSliderNextClick}
              disabled={camerasOnSlider.includes(cameras[cameras.length - 1])}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
