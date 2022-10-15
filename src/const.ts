export const MAX_CARDS_ON_PAGE = 9;
export const DEFOLT_CATALOG_PAGE = 1;
export const PAGINATION_STEP = 1;
export const MAX_CARDS_ON_SLIDER = 3;
export const HOST_URL = 'http://localhost:3000';

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
  Promo: '/promo'
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
  AddReview = 'AddReview',
  AddBasket = 'AddBasket',
}

