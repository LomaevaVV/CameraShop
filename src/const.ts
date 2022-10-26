export const MAX_CARDS_ON_PAGE = 9;
export const DEFOLT_CATALOG_PAGE = 1;
export const PAGINATION_STEP = 1;
export const PAGE_PATH_ARRAY_IDX = 1;
export const MAX_CARDS_ON_SLIDER = 3;
export const MORE_REVIEWS_STEP = 3;
export const SCROLL_TIMEOUT = 1000;
export const MIN_LENGTH_REVIEW = 5;

export enum AppRoute {
  Main = '/',
  Catalog = '/catalog',
  CatalogPage = '/catalog/page_:page',
  Product = '/product/:id',
  NotFound = '/*'
}

export const APIRoute = {
  Cameras: '/cameras?_limit=9&_start=:FirstObjOnPageIdx',
  Camera: '/cameras/:id',
  Promo: '/pro/mo',
  Reviews: '/reviews'
} as const;

export enum NameSpace {
  Cameras = 'CAMERAS',
  Promo = 'PROMO',
  App = 'APP',
  Reviews = 'REVIEWS'
}

export const enum FetchStatus {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Rejected = 'REJECTED',
}

export enum ClassName {
  Product = 'product',
  ProductCard = 'product-card',
  ReviewCard = 'review-card',
}

export enum ModalState {
  Closed = 'closed',
  AddReview = 'addReview',
  ReviewSuccess = 'reviewSuccess',
  AddBasket = 'addBasket',
}

export enum ProductTubs {
  Description = 'description',
  Features = 'features'
}
